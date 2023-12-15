import fs from "fs"
import { execa } from "execa"
import { getPackageManager } from "./get-package-manager.js"
import { getCommand } from "@antfu/ni"
import path from "path"

async function blockGenerator(executeArgs, installArgs, componentCodePath) {
  const packageManager = await getPackageManager()

  try {
    console.log("Installing required packages...")

    const executeCommand = getCommand(packageManager, "execute")
    const installCommand = getCommand(packageManager, "install")

    await execa(executeCommand, executeArgs, {
      stdio: "inherit",
    })

    await execa(installCommand, installArgs, {
      cwd: "cosmic-app",
      stdio: "inherit",
    })

    console.log("Required packages installed successfully.")
  } catch (error) {
    console.error("Error installing required packages:", error)
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

export { blockGenerator }
