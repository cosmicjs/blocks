import fs from "fs"
import path, { dirname } from "path"
import { Command, program } from "commander"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function addComponent(component) {
  console.log("component", component)
  const componentPath = path.join(__dirname, "components", component)
  const componentCommandsPath = path.join(componentPath, "index.js")
  const componentCodePath = path.join(componentPath, "component.tsx")
  const blocksFolderPath = path.join(__dirname, "blocks")

  console.log("componentCommandsPath", componentCommandsPath)

  if (!fs.existsSync(blocksFolderPath)) {
    fs.mkdirSync(blocksFolderPath)
    console.log("Blocks folder created successfully.")
  }

  if (fs.existsSync(componentCommandsPath)) {
    const commands = await import(componentCommandsPath)
    if (commands && typeof commands.installPackages === "function") {
      // Execute the install command
      await commands.installPackages()
    }

    if (fs.existsSync(componentCodePath)) {
      const componentCode = commands.getComponentCode()
      const componentFilePath = path.join(blocksFolderPath, `${component}.tsx`)
      try {
        fs.writeFileSync(componentFilePath, componentCode)
        console.log(
          `Component code added to ${component}.tsx in blocks folder.`
        )
      } catch (error) {
        console.error(`Error writing component code to file: ${error}`)
      }
    } else {
      console.error(`Component code (${component}.tsx) not found.`)
    }
  } else {
    console.error(`Commands file (${component}/index.js) not found.`)
  }
}

const addCommand = new Command()
  .name("add")
  .description("add a block to your project")
  .argument("<component>", "the component to add")
  .action((component) => addComponent(component))

program.addCommand(addCommand)
program.parse()
