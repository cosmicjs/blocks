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

async function blockGenerator(blockObject, sourceFolderPath) {
  const { installationSteps, executionSteps, name } = blockObject
  const packageManager = await getPackageManager()

  // Step 1. Installing and executing packages & scripts
  try {
    console.log(
      `Installing required packages for ${chalk.yellow(name)} Block...`
    )
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
        chalk.green(`Packages for ${name} Block installed successfully!`)
      )
    }
  } catch (error) {
    console.error(
      chalk.red(`Error installing required packages for ${name} Block:`),
      error
    )
  }

  // Step 2. Copying the files
  try {
    const cosmicFolderPath = createCosmicFolder()
    const blocksPath = createBlocksFolder(cosmicFolderPath)

    // After the Blocks folder is created
    if (blocksPath) {
      // Create cosmic.ts file and lib folder if it doesn't exist
      createConfigFile(cosmicFolderPath)
      createUtilsFile(cosmicFolderPath)

      // Create a folder with the block's name key
      let destinationFolderPath = path.join(blocksPath, name.toLowerCase())
      if (fs.existsSync(destinationFolderPath)) {
        const response = await prompts({
          type: "select",
          name: "overwrite",
          message: `Looks like the Block ${chalk.yellow(
            name
          )} already exists. Do you want to ${chalk.red("overwrite")} it?`,
          choices: [
            { title: "Yes, overwrite", value: true },
            { title: "No, cancel installation", value: false },
          ],
          initial: 0, // Initial selection is "Yes"
        })

        if (response.overwrite) {
          // Remove existing folder
          console.log(`Overwriting existing ${name} folder`)
          fs.rmSync(destinationFolderPath, { recursive: true })
        } else {
          console.log(chalk.red("Installation cancelled."))
          return
        }
      }

      // Create the new folder
      fs.mkdirSync(destinationFolderPath)

      // Copy the files from source folder into the newly created or replaced destination folder
      fs.readdirSync(sourceFolderPath).forEach((file) => {
        console.log("-> Copying", file, "...")
        const sourceFile = path.join(sourceFolderPath, file)
        const destinationFile = path.join(destinationFolderPath, file)
        fs.copyFileSync(sourceFile, destinationFile)
      })
    }

    console.log(chalk.green(`Block ${name} added successfully!`))
    console.log(chalk.yellow(`View more blocks at cosmicjs.com/blocks.`))
  } catch (error) {
    if (error.code === "EEXIST")
      console.error(
        chalk.red(
          `ERROR: Installation failed. Looks like Block "${name}" or a folder with the same name already exists.`
        )
      )
    else
      console.error(chalk.red(`Error copying code for ${name} Block:`), error)
    return ""
  }
}

function updateTailwindFile(cosmicFolderPath) {
  // content.push(path.join(cosmicFolderPath, "**/*.ts"))
  // content.push(path.join(cosmicFolderPath, "**/*.tsx"))
  // content.push(path.join(cosmicFolderPath, "**/*.js"))
  // console.log("content", content)
  // fs.writeFileSync(
  //   tailwindConfigPath,
  //   `module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`
  // )
}

function createCosmicFolder() {
  const currentDir = process.cwd()
  let cosmicFolderPath = path.join(currentDir, "cosmic")

  if (!fs.existsSync(cosmicFolderPath)) {
    fs.mkdirSync(cosmicFolderPath)
    console.log("-> Cosmic folder created successfully.")
  }

  updateTailwindFile(cosmicFolderPath)

  return cosmicFolderPath
}

function createBlocksFolder(cosmicFolderPath) {
  const blocksFolderPath = path.join(cosmicFolderPath, "blocks")

  if (!fs.existsSync(blocksFolderPath)) {
    fs.mkdirSync(blocksFolderPath)
    console.log("-> Blocks folder created successfully.")
  }

  return blocksFolderPath
}

function createConfigFile(cosmicFolderPath) {
  const sourceConfigFilePath = path.join(__dirname, "../cosmic/client.ts")
  const configFilePath = path.join(cosmicFolderPath, "client.ts")

  if (fs.existsSync(cosmicFolderPath) && !fs.existsSync(configFilePath)) {
    console.log("-> Copying client file...")
    fs.copyFileSync(
      sourceConfigFilePath,
      path.join(cosmicFolderPath, "client.ts")
    )
  }
}

function createUtilsFile(cosmicFolderPath) {
  const sourceUtilsPath = path.join(__dirname, "../cosmic/utils.ts")
  const utilsFilePath = path.join(cosmicFolderPath, "utils.ts")

  if (fs.existsSync(cosmicFolderPath) && !fs.existsSync(utilsFilePath)) {
    console.log("-> Copying utils file...")
    fs.copyFileSync(sourceUtilsPath, path.join(cosmicFolderPath, "utils.ts"))
  }
}

export { blockGenerator, createConfigFile }
