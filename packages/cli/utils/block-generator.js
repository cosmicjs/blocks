import fs from "fs"

import { execa } from "execa"
import { getPackageManager } from "./get-package-manager.js"
import { getCommand } from "@antfu/ni"
import { execSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import prompts from "prompts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let hasRanOnce = false

async function blockGenerator(blockObject, sourceFolderPath) {
  const { installationSteps, executionSteps, name, elements } = blockObject
  const packageManager = await getPackageManager()

  // Step 0. Check to make sure the block isn't already installed
  const cosmicFolderPath = createCosmicFolder()
  const blocksPath = createBlocksFolder(cosmicFolderPath)

  // Create a folder with the block's name key
  let destinationFolderPath = path.join(
    blocksPath,
    name.toLowerCase().replace(" ", "-")
  )

  // Overwrite prompt
  if (fs.existsSync(destinationFolderPath)) {
    const response = await prompts({
      type: "select",
      name: "overwrite",
      message: `Looks like the ${chalk.yellow(
        name
      )} Block already exists. Do you want to ${chalk.red("overwrite")} it?`,
      choices: [
        { title: "Yes, overwrite", value: true },
        { title: "No, cancel installation", value: false },
      ],
      initial: 0, // Initial selection is "Yes",
      sessionId: name, // Unique session ID
    })

    if (response.overwrite) {
      // Remove existing folder
      console.log(`Overwriting existing ${chalk.bold(name)} folder...`)
      fs.rmSync(destinationFolderPath, { recursive: true })
    } else {
      console.log(
        chalk.red(`✗ Installation for ${chalk.bold(name)} Block cancelled.`)
      )
      console.log(" ")
      return
    }
  }

  // Step 1. Installing and executing packages & scripts
  try {
    console.log(`Installing required packages for ${chalk.bold(name)} Block...`)

    const executeCommand = getCommand(packageManager, "execute")

    if (executionSteps) {
      for (const arg of executionSteps) {
        execSync(`${executeCommand} ${arg}`, { stdio: "inherit" })
      }
    }

    if (installationSteps) {
      for (const step of installationSteps) {
        await execa(
          packageManager,
          [packageManager === "npm" ? "install" : "add", step],
          {
            cwd: process.cwd(), // current cli directory
          }
        )
      }

      console.log(
        chalk.green(
          `✔ Packages for ${chalk.bold(name)} Block installed successfully!`
        )
      )
    }
  } catch (error) {
    console.error(
      chalk.red(
        `✗ Error installing required packages for ${chalk.bold(name)} Block:`
      ),
      error
    )
  }

  // Step 2. Adding the files
  try {
    // After the Blocks folder is created
    if (blocksPath) {
      // Create cosmic.ts file and lib folder if it doesn't exist
      createConfigFile(cosmicFolderPath)
      createUtilsFile(cosmicFolderPath)

      // Create the new folder
      fs.mkdirSync(destinationFolderPath)

      // Copy the files from source folder into the newly created or replaced destination folder
      fs.readdirSync(sourceFolderPath).forEach((file) => {
        console.log("➤ Adding", file, "...")
        const sourceFile = path.join(sourceFolderPath, file)
        const destinationFile = path.join(destinationFolderPath, file)
        fs.copyFileSync(sourceFile, destinationFile)
      })
    }

    // Copy Elements from the source folder to the destination folder
    if (!!elements?.length) {
      for (const element of elements) {
        const elementFilePath = path.join(
          __dirname,
          "../src/elements",
          `${element}.tsx`
        )

        const elementsFolderPath = path.join(cosmicFolderPath, "elements")

        if (!fs.existsSync(elementsFolderPath)) {
          fs.mkdirSync(elementsFolderPath, { recursive: true })
        }

        const cosmicElementsFilePath = path.join(
          elementsFolderPath,
          `${element}.tsx`
        )

        if (fs.existsSync(elementFilePath)) {
          if (!fs.existsSync(cosmicElementsFilePath)) {
            console.log(`➤ Adding ${element} element...`)
            fs.copyFileSync(elementFilePath, cosmicElementsFilePath)
          }
        }
      }
    }

    // Update tailwind config to include Cosmic folder
    updateTailwindFile()

    console.log(
      chalk.green(
        `✔ ${chalk.bold(
          name
        )} Block added successfully! Find it at /cosmic/blocks/${name
          .toLowerCase()
          .replace(" ", "-")}`
      )
    )
    console.log(" ")
    hasRanOnce = true
    return "success"
  } catch (error) {
    if (error.code === "EEXIST")
      console.error(
        chalk.red(
          `✗ ERROR: Installation failed. Looks like "${chalk.bold(
            name
          )}" Block or a folder with the same name already exists.`
        )
      )
    else
      console.error(
        chalk.red(`✗ Error adding code for ${chalk.bold(name)} Block:`),
        error
      )
    hasRanOnce = true
    return "failure"
  }
}

function updateTailwindFile() {
  if (hasRanOnce) return

  const cosmicTailwindPath = "./cosmic/**/*.{ts,tsx,js,jsx}"

  const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js")
  const tailwindConfigTSPath = path.join(process.cwd(), "tailwind.config.ts")

  if (fs.existsSync(tailwindConfigPath)) {
    updateTailwindConfig(tailwindConfigPath, cosmicTailwindPath)
  } else if (fs.existsSync(tailwindConfigTSPath)) {
    updateTailwindConfig(tailwindConfigTSPath, cosmicTailwindPath)
  }
}

function updateTailwindConfig(configPath, cosmicPath) {
  const content = fs.readFileSync(configPath, "utf8")

  const regex = /content:\s*\[\s*[\s\S]*?\s*\]/g
  const match = content.match(regex)

  if (match?.length > 0) {
    let arrayString = match[0].replace("content: ", "")
    arrayString = arrayString.replace(/'/g, '"')
    arrayString = arrayString.replace(/,(?=[^,]*$)/, "")
    let parsedArray = JSON.parse(arrayString)
    const hasCosmicPath = Boolean(
      parsedArray.filter((arr) => arr.includes("/cosmic/")).length > 0
    )
    if (!hasCosmicPath) {
      console.log("➤ Adding cosmic folder to tailwind config file...")

      parsedArray.push(cosmicPath)
      let newContent = `content: ${JSON.stringify(parsedArray)}`
      const oldContent = match[0]
      const updatedTailwindConfig = content.replace(oldContent, newContent)

      fs.writeFileSync(configPath, updatedTailwindConfig, "utf8")

      console.log(chalk.green("✔ Tailwind config updated successfully!"))
    }
  } else {
    console.log(
      chalk.red(
        "✗ Error locating tailwind config file. Please add cosmic folder to your content path manually."
      )
    )
  }
}

function createCosmicFolder() {
  const currentDir = process.cwd()
  let cosmicFolderPath = path.join(currentDir, "cosmic")
  if (!fs.existsSync(cosmicFolderPath)) {
    fs.mkdirSync(cosmicFolderPath)
    console.log("➤ Cosmic folder created successfully.")
  }

  return cosmicFolderPath
}

function createBlocksFolder(cosmicFolderPath) {
  const blocksFolderPath = path.join(cosmicFolderPath, "blocks")
  if (!fs.existsSync(blocksFolderPath)) {
    fs.mkdirSync(blocksFolderPath)
    console.log("➤ Blocks folder created successfully.")
  }

  return blocksFolderPath
}

function createConfigFile(cosmicFolderPath) {
  const sourceConfigFilePath = path.join(__dirname, "../src/client.ts")
  const configFilePath = path.join(cosmicFolderPath, "client.ts")

  if (fs.existsSync(cosmicFolderPath) && !fs.existsSync(configFilePath)) {
    console.log("➤ Adding client file...")
    fs.copyFileSync(
      sourceConfigFilePath,
      path.join(cosmicFolderPath, "client.ts")
    )
  }
}

function createUtilsFile(cosmicFolderPath) {
  const sourceUtilsPath = path.join(__dirname, "../src/utils.ts")
  const utilsFilePath = path.join(cosmicFolderPath, "utils.ts")

  if (fs.existsSync(cosmicFolderPath) && !fs.existsSync(utilsFilePath)) {
    console.log("➤ Adding utils file...")
    fs.copyFileSync(sourceUtilsPath, path.join(cosmicFolderPath, "utils.ts"))
  }
}

export { blockGenerator, createConfigFile }
