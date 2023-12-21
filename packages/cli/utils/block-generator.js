import fs from "fs"
import { execa } from "execa"
import { getPackageManager } from "./get-package-manager.js"
import { getCommand } from "@antfu/ni"
import { execSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function blockGenerator(blockObject, sourceFolderPath) {
  const { installationSteps, executionSteps, name } = blockObject
  const packageManager = await getPackageManager()

  // Step 1. Installing and executing packages & scripts
  try {
    console.log("Installing required packages...")
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

      console.log(chalk.green("Packages installed successfully!"))
    }
  } catch (error) {
    console.error(chalk.red("Error installing required packages:"), error)
  }

  // Step 2. Copying the files
  try {
    const blocksPath = createBlocksFolder()

    // After the Blocks folder is created
    if (blocksPath) {
      // Create cosmic.ts file and lib folder if it doesn't exist
      createCosmicFile()

      // Create a folder with the block's name key
      let destinationFolderPath = path.join(blocksPath, name.toLowerCase())
      // If a folder with same block/name exists, create a new folder with a number next to it, else create the folder
      if (fs.existsSync(destinationFolderPath)) {
        let counter = 2
        let newFolderPath = destinationFolderPath
        while (fs.existsSync(newFolderPath)) {
          newFolderPath = `${destinationFolderPath}-${counter}`
          counter++
        }
        fs.mkdirSync(newFolderPath)
        destinationFolderPath = newFolderPath
      } else fs.mkdirSync(destinationFolderPath)

      // Copy the files from source folder into the newly created destination folder
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
    else console.error(chalk.red("Error copying block code:"), error)
    return ""
  }
}

function createCosmicFile() {
  const currentDir = process.cwd()
  const libFolderPath = path.join(currentDir, "lib")
  const parentCosmicTsPath = path.join(__dirname, "../cosmic.ts")

  if (fs.existsSync(libFolderPath)) {
    fs.copyFileSync(parentCosmicTsPath, path.join(libFolderPath, "cosmic.ts"))
  } else {
    const newFolderPath = path.join(currentDir, "lib")
    fs.mkdirSync(newFolderPath)
    fs.copyFileSync(parentCosmicTsPath, path.join(newFolderPath, "cosmic.ts"))
  }
}

function createBlocksFolder() {
  const currentDir = process.cwd()
  const srcFolderPath = path.join(currentDir, "src")
  const componentsFolderPath = path.join(currentDir, "components")
  let blocksFolderPath = path.join(currentDir, "blocks")

  if (fs.existsSync(srcFolderPath)) {
    blocksFolderPath = path.join(srcFolderPath, "blocks")
    fs.mkdirSync(blocksFolderPath)
    console.log("-> Blocks folder created successfully inside 'src' folder.")
    return blocksFolderPath
  } else if (fs.existsSync(componentsFolderPath)) {
    blocksFolderPath = path.join(componentsFolderPath, "blocks")
    fs.mkdirSync(blocksFolderPath, { recursive: true })
    console.log(
      "-> Blocks folder created successfully inside 'components' folder."
    )
    return blocksFolderPath
  } else {
    fs.mkdirSync(blocksFolderPath)
    console.log(
      `-> Blocks folder created successfully in root path. ${chalk.red(
        "Make sure to include it in your tailwind.config and tsconfig."
      )} `
    )
    return blocksFolderPath
  }
}

export { blockGenerator, createCosmicFile }
