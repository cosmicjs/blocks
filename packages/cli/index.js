const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")

const componentName = process.argv[2]

function addComponent(component) {
  const componentPath = path.join(__dirname, "components", component)
  const componentCommandsPath = path.join(componentPath, "index.js")
  const componentCodePath = path.join(componentPath, "component.tsx")
  const blocksFolderPath = path.join(__dirname, "blocks")

  if (!fs.existsSync(blocksFolderPath)) {
    fs.mkdirSync(blocksFolderPath)
    console.log("Blocks folder created successfully.")
  }

  if (fs.existsSync(componentCommandsPath)) {
    const commands = require(componentCommandsPath)
    if (commands && typeof commands.installPackages === "function") {
      commands.installPackages()
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
    console.error(`Commands file (${component}/commands.js) not found.`)
  }
}

if (componentName) {
  addComponent(componentName)
} else {
  console.error("Please specify a block name.")
}
