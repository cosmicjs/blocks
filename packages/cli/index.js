#!/usr/bin/env node

import path, { dirname } from "path"
import { Command, program } from "commander"
import { fileURLToPath } from "url"
import { capitalize } from "./utils/capitalize.js"
import { blockGenerator } from "./utils/block-generator.js"
import chalk from "chalk"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const blocks = {
  blog: {
    name: "Blog",
    installationSteps: ["@cosmicjs/sdk", "react-markdown", "lucide-react"],
  },
  faqs: {
    name: "FAQs",
    installationSteps: [
      "@cosmicjs/sdk",
      "@radix-ui/react-accordion",
      "@radix-ui/react-icons",
      "clsx",
      "tailwind-merge",
    ],
  },
}

async function addComponent(component) {
  const blockData = blocks[component]

  console.log(
    chalk.yellow(
      `-> Initiating installation of ${capitalize(blockData.name)} Block...`
    )
  )

  // source code for the block
  const sourceFolderPath = path.join(__dirname, "src", component)

  await blockGenerator(blockData, sourceFolderPath)
}

const addCommand = new Command()
  .name("add")
  .description("add blocks to your project")
  .argument("<components...>", "the blocks to add")
  .action((components) => {
    components.forEach((component) => {
      // Iterate through the blocks
      if (!Object.keys(blocks).includes(component)) {
        console.error(
          `"${component}" is an invalid Block name. Please find a valid list of Blocks on cosmicjs.com/blocks`
        )
      } else addComponent(component)
    })
  })

program.addCommand(addCommand)
program.parse()

export { addComponent }
