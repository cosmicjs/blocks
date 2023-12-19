#!/usr/bin/env node

import fs from "fs"
import path, { dirname } from "path"
import { Command, program } from "commander"
import { fileURLToPath } from "url"
import { capitalize } from "./utils/capitalize.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const validBlocks = ["gallery", "blog", "page"]

async function addComponent(component) {
  console.log(`Initiating installation of ${capitalize(component)} Block...`)
  const componentPath = path.join(__dirname, "components", component)
  const componentCommandsPath = path.join(componentPath, "index.js")
  const componentCodePath = path.join(componentPath, "component.tsx")

  if (fs.existsSync(componentCommandsPath)) {
    const { generateBlock } = await import(componentCommandsPath)

    if (fs.existsSync(componentCodePath)) {
      // Execute the component/block copying steps
      const componentCode = await generateBlock()

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

      // Create the block component file
      const componentFilePath = path.join(blocksFolderPath, `${component}.tsx`)

      // Copy the component code to it
      try {
        fs.writeFileSync(componentFilePath, componentCode)
        console.log(`-> Block file ${component}.tsx added successfully.`)
      } catch (error) {
        console.error(`Error writing block code to file: ${error}`)
      }

      // Check if cosmic.ts file exists in the blocks folder
      const cosmicFilePath = path.join(blocksFolderPath, "cosmic.ts")
      if (!fs.existsSync(cosmicFilePath)) {
        // If not, copy the cosmic.ts file from the current directory
        const currentCosmicFilePath = path.join(__dirname, "cosmic.ts")
        if (fs.existsSync(currentCosmicFilePath)) {
          try {
            fs.copyFileSync(currentCosmicFilePath, cosmicFilePath)
            console.log(
              "-> cosmic.ts file created successfully. Make sure to add your ENV variables!"
            )
          } catch (error) {
            console.error(`Error copying cosmic.ts file: ${error}`)
          }
        } else {
          console.error(
            "cosmic.ts file does not exist in the current directory."
          )
        }
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
  .argument("<component>", "the block to add")
  .action((component) => {
    if (!validBlocks.includes(component)) {
      console.error(
        `"${component}" is an invalid Block name. Please find a valid list of Blocks on cosmicjs.com/blocks`
      )
    } else addComponent(component)
  })

program.addCommand(addCommand)
program.parse()

export { addComponent }
