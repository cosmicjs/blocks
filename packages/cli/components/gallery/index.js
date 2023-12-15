// import fs from "fs"
// import path, { dirname } from "path"
// import { execa } from "execa"
// import { getPackageManager } from "../../utils/get-package-manager.js"
// import { getCommand } from "@antfu/ni"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// async function installPackages() {
//   const packageManager = await getPackageManager()

//   try {
//     console.log("Executing installation commands...")

//     const executeCommand = getCommand(packageManager, "execute")
//     const installCommand = getCommand(packageManager, "install")

//     console.log(
//       "executeCommand, installCommand",
//       executeCommand,
//       installCommand
//     )

//     await execa(executeCommand, ["create-next-app@latest", "cosmic-app"], {
//       stdio: "inherit",
//     })
//     await execa(installCommand, ["@cosmicjs/sdk"], {
//       cwd: "cosmic-app",
//       stdio: "inherit",
//     })

//     console.log("Installation commands executed.")
//     console.log("Required packages installed successfully.")
//   } catch (error) {
//     console.error("Error installing required packages:", error)
//   }
// }

// function getComponentCode() {
//   const componentCodePath = path.join(__dirname, "component.tsx")
//   let blocksFolderPath = ""

//   try {
//     if (fs.existsSync(componentCodePath)) {
//       const componentCode = fs.readFileSync(componentCodePath, "utf8")
//       return componentCode
//     } else {
//       console.error("Component code file not found.")
//       return ""
//     }
//   } catch (error) {
//     console.error("Error reading component code:", error)
//     return ""
//   }
// }

// export { installPackages, getComponentCode }
import { blockGenerator } from "../../utils/block-generator.js"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const executeArgs = ["create-next-app@latest", "cosmic-app"]
const installArgs = ["commander"]
const componentCodePath = path.join(__dirname, "component.tsx")

async function generateBlock() {
  let componentCode
  try {
    componentCode = await blockGenerator(
      executeArgs,
      installArgs,
      componentCodePath
    )
    return componentCode
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export { generateBlock }
