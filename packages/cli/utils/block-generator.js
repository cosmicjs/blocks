import fs from "fs"
import { execa } from "execa"
import { getPackageManager } from "./get-package-manager.js"
import { getCommand } from "@antfu/ni"
import { execSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function blockGenerator(blockObject, blockCodePath) {
  const { installationSteps, executionSteps, name } = blockObject
  const packageManager = await getPackageManager()

  try {
    console.log("Installing required packages...")
    const executeCommand = getCommand(packageManager, "execute")

    if (executionSteps) {
      for (const arg of executionSteps) {
        execSync(`${executeCommand} ${arg}`, { stdio: "inherit" })
      }
    }

    if (installationSteps) {
      if (fs.existsSync(path.join("cosmic-app"))) {
        await execa(
          packageManager,
          [packageManager === "npm" ? "install" : "add", ...installationSteps],
          {
            cwd: "cosmic-app",
          }
        )
      } else {
        for (const step of installationSteps) {
          await execa(
            packageManager,
            [packageManager === "npm" ? "install" : "add", step],
            {
              cwd: process.cwd(), // current cli directory
            }
          )
        }
      }
      console.log("Block installed successfully!")
    }
  } catch (error) {
    console.error("Error installing required packages:", error)
  }

  try {
    // Check if cosmic-app folder exists & get the blocksFolderPath
    const cosmicAppPath = path.join(process.cwd(), "cosmic-app")
    let blocksFolderPath
    if (fs.existsSync(cosmicAppPath)) {
      blocksFolderPath = path.join(cosmicAppPath, "blocks")
    } else {
      blocksFolderPath = path.join(process.cwd(), "blocks")
    }

    // Create blocks folder in the blocksFolderPath
    if (!fs.existsSync(blocksFolderPath)) {
      fs.mkdirSync(blocksFolderPath)
      console.log("-> Blocks folder created successfully.")
    }

    // After the Blocks folder is created
    if (blocksFolderPath) {
      // Create cosmic.ts file and lib folder if it doesn't exist
      createCosmicFile()

      // Create a folder with the folderName parameter
      const newFolderPath = path.join(blocksFolderPath, name.toLowerCase())
      fs.mkdirSync(newFolderPath)

      // Create a folder with the files from Block source folder
      const sourceFolderPath = blockCodePath
      const destinationFolderPath = newFolderPath
      console.log(
        "destinationFolderPath, sourceFolderPath",
        destinationFolderPath,
        sourceFolderPath
      )
      fs.readdirSync(sourceFolderPath).forEach((file) => {
        console.log("file", file)
        const sourceFile = path.join(sourceFolderPath, file)
        const destinationFile = path.join(destinationFolderPath, file)
        fs.copyFileSync(sourceFile, destinationFile)
      })
    }

    console.log(`Block ${name} added successfully`)
  } catch (error) {
    console.error("Error copying block code:", error)
    return ""
  }
}

function createCosmicFile() {
  const currentDir = process.cwd()
  const cosmicAppPath = path.join(currentDir, "cosmic-app")
  const cosmicAppLibFolder = path.join(cosmicAppPath, "lib")
  const libFolderPath = path.join(currentDir, "lib")
  const parentCosmicTsPath = path.join(__dirname, "../cosmic.ts")

  // If cosmic-app folder exists
  if (fs.existsSync(cosmicAppPath)) {
    if (fs.existsSync(cosmicAppLibFolder))
      fs.copyFileSync(
        parentCosmicTsPath,
        path.join(cosmicAppLibFolder, "cosmic.ts")
      )
    else {
      const newFolderPath = path.join(cosmicAppPath, "lib")
      fs.mkdirSync(newFolderPath)
      fs.copyFileSync(parentCosmicTsPath, path.join(newFolderPath, "cosmic.ts"))
    }
  } else if (fs.existsSync(libFolderPath)) {
    // If lib folder exists
    fs.copyFileSync(parentCosmicTsPath, path.join(libFolderPath, "cosmic.ts"))
  } else {
    // If lib folder doesn't exist, create a new folder and place cosmic.ts there
    let newFolderPath
    if (fs.existsSync(cosmicAppPath))
      newFolderPath = path.join(cosmicAppPath, "lib")
    else newFolderPath = path.join(currentDir, "lib")
    fs.mkdirSync(newFolderPath)
    fs.copyFileSync(parentCosmicTsPath, path.join(newFolderPath, "cosmic.ts"))
  }
}

export { blockGenerator, createCosmicFile }
