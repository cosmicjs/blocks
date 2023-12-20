#!/usr/bin/env node

import path, { dirname } from "path"
import { Command, program } from "commander"
import { fileURLToPath } from "url"
import { capitalize } from "./utils/capitalize.js"
import { blockGenerator } from "./utils/block-generator.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const blocks = {
  blog: {
    name: "Blog",
    installationSteps: ["@cosmicjs/sdk", "react-markdown", "lucide-react"],
  },
  faqs: {
    name: "FAQs",
    installationSteps: ["@cosmicjs/sdk", "@radix-ui/react-accordion"],
  },
}

async function addComponent(component) {
  console.log(`-> Initiating installation of ${capitalize(component)} Block...`)

  const blockCodePath = path.join(__dirname, "components", component)
  const blockData = blocks[component]

  await blockGenerator(blockData, blockCodePath)
}

const addCommand = new Command()
  .name("add")
  .description("add a block to your project")
  .argument("<component>", "the block to add")
  .action((component) => {
    if (!Object.keys(blocks).includes(component)) {
      console.error(
        `"${component}" is an invalid Block name. Please find a valid list of Blocks on cosmicjs.com/blocks`
      )
    } else addComponent(component)
  })

program.addCommand(addCommand)
program.parse()

export { addComponent }
