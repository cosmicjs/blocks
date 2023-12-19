import fs from "fs"
import { execa } from "execa"
import { getPackageManager } from "./get-package-manager.js"
import { getCommand } from "@antfu/ni"
import { execSync } from "child_process"
import path from "path"

async function blockGenerator({
  executionSteps,
  installationSteps,
  componentCodePath,
}) {
  const packageManager = await getPackageManager()

  try {
    console.log("Installing required packages...")
    const executeCommand = getCommand(packageManager, "execute")

    if (executionSteps) {
      for (const arg of executionSteps) {
        execSync(`${executeCommand} ${arg}`, { stdio: "inherit" })
      }
    }

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
