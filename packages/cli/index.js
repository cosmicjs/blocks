#!/usr/bin/env node

import path, { dirname } from "path"
import { Command, program } from "commander"
import { fileURLToPath } from "url"
import { capitalize } from "./utils/capitalize.js"
import { blockGenerator } from "./utils/block-generator.js"
import { performance } from "perf_hooks"

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
  pages: {
    name: "Pages",
    installationSteps: [
      "@cosmicjs/sdk",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "tailwind-merge",
    ],
    elements: ["Button"],
  },
  comments: {
    name: "Comments",
    installationSteps: [
      "@cosmicjs/sdk",
      "lucide-react",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "@radix-ui/react-label",
    ],
    elements: ["Button", "Input", "Label", "TextArea"],
  },
  "image-gallery": {
    name: "Image Gallery",
    installationSteps: ["@cosmicjs/sdk", "tailwind-merge"],
  },
  testimonials: {
    name: "Testimonials",
    installationSteps: ["@cosmicjs/sdk"],
  },
  team: {
    name: "Team",
    installationSteps: ["@cosmicjs/sdk"],
  },
  "navigation-menu": {
    name: "Navigation Menu",
    installationSteps: ["@cosmicjs/sdk", "lucide-react"],
  },
  products: {
    name: "Products",
    installationSteps: [
      "@cosmicjs/sdk",
      "@radix-ui/react-slot",
      "class-variance-authority",
    ],
    elements: ["Button"],
  },
  events: {
    name: "events",
    installationSteps: ["@cosmicjs/sdk"],
  },
}

async function addComponent(component) {
  const blockData = blocks[component]

  console.log(
    chalk.yellow(
      `➤ Initiating installation of ${chalk.bold(
        capitalize(blockData.name)
      )} Block...`
    )
  )
  console.log(" ")

  // source code for the block
  const sourceFolderPath = path.join(__dirname, "src", component)

  const response = await blockGenerator(blockData, sourceFolderPath)
  return response
}

const addCommand = new Command()
  .name("add")
  .description("add blocks to your project")
  .argument("<components...>", "the blocks to add")
  .action(async (components) => {
    let response
    const startTime = performance.now()
    for (const component of components) {
      if (!Object.keys(blocks).includes(component)) {
        return console.error(
          chalk.red(
            `"${component}" is an invalid Block name. Please find a valid list of Blocks on ${chalk.bold(
              "https://cosmicjs.com/blocks."
            )}`
          )
        )
      } else {
        response = await addComponent(component)
      }
    }
    const endTime = performance.now()
    const speed = ((endTime - startTime) / 1000).toFixed(2)

    if (response === "success") {
      if (speed < 5)
        console.log(
          chalk.greenBright(`ϟ Executed superfast in ${speed} seconds!`)
        )

      console.log(
        chalk.yellow(
          `➤ View more Blocks at ${chalk.bold("https://cosmicjs.com/blocks.")}`
        )
      )
    }
  })

program.addCommand(addCommand)
program.parse()

export { addComponent }
