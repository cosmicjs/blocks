import fs from "fs"
import path, { dirname } from "path"
import { execa } from "execa"
import { getPackageManager } from "../../utils/get-package-manager.js"
import { getCommand } from "@antfu/ni"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function installPackages() {
  const packageManager = await getPackageManager()

  try {
    console.log("Executing installation commands...")

    const executeCommand = getCommand(packageManager, "execute")
    const installCommand = getCommand(packageManager, "install")

    console.log(
      "executeCommand, installCommand",
      executeCommand,
      installCommand
    )

    await execa(executeCommand, ["create-next-app@latest", "cosmic-app"], {
      stdio: "inherit",
    })
    await execa("bun add", ["@cosmicjs/sdk"], {
      cwd: "cosmic-app",
      stdio: "inherit",
    })

    console.log("Installation commands executed.")
    console.log("Required packages installed successfully.")
  } catch (error) {
    console.error("Error installing required packages:", error)
  }
}

function getComponentCode() {
  const componentCodePath = path.join(__dirname, "component.tsx")
  let blocksFolderPath = ""

  // Check if 'cosmic-app' directory exists
  if (fs.existsSync(path.join(__dirname, "cosmic-app"))) {
    // If it exists, create 'blocks' folder inside 'cosmic-app'
    blocksFolderPath = path.join(__dirname, "cosmic-app", "blocks")
  } else {
    // If it doesn't exist, create 'blocks' folder in the current directory
    blocksFolderPath = path.join(__dirname, "blocks")
  }

  // Create 'blocks' folder if it doesn't exist
  if (!fs.existsSync(blocksFolderPath)) {
    fs.mkdirSync(blocksFolderPath)
  }

  try {
    if (fs.existsSync(componentCodePath)) {
      const componentCode = fs.readFileSync(componentCodePath, "utf8")
      return componentCode
    } else {
      console.error("Component code file not found.")
      return ""
    }
  } catch (error) {
    console.error("Error reading component code:", error)
    return ""
  }
}

export { installPackages, getComponentCode }
