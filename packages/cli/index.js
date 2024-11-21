#!/usr/bin/env node
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import chalk from "chalk"
import { Command, program } from "commander"

import { blockGenerator } from "./utils/block-generator.js"
import { capitalize } from "./utils/capitalize.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const blocks = {
  blog: {
    name: "Blog",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "react-markdown",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },
  faqs: {
    name: "FAQs",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "@radix-ui/react-accordion",
      "@radix-ui/react-icons",
      "clsx",
      "tailwind-merge",
    ],
  },
  "landing-page": {
    name: "Landing Page",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    elements: ["Button"],
  },
  comments: {
    name: "Comments",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "lucide-react",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "@radix-ui/react-label",
      "clsx",
      "tailwind-merge",
    ],
    elements: ["Button", "Input", "Label", "TextArea"],
  },
  "contact-form": {
    name: "Contact Form",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "lucide-react",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "@radix-ui/react-label",
      "clsx",
      "tailwind-merge",
      "resend",
    ],
    elements: ["Button", "Input", "Label", "TextArea"],
  },
  "image-gallery": {
    name: "Image Gallery",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "clsx",
      "tailwind-merge",
      "embla-carousel-react",
      "lucide-react",
      "react-medium-image-zoom",
      "@radix-ui/react-slot",
      "class-variance-authority",
    ],
    elements: ["Button", "Carousel"],
  },
  testimonials: {
    name: "Testimonials",
    installationSteps: ["@cosmicjs/sdk@1.2.0", "clsx", "tailwind-merge"],
  },
  team: {
    name: "Team",
    installationSteps: ["@cosmicjs/sdk@1.2.0", "clsx", "tailwind-merge"],
  },
  "navigation-menu": {
    name: "Navigation Menu",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },
  ecommerce: {
    name: "Ecommerce",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "stripe",
    ],
    elements: ["Button"],
  },
  pagination: {
    name: "Pagination",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    elements: ["Button", "Pagination"],
  },
  events: {
    name: "events",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    elements: ["Button"],
  },
  localization: {
    name: "localization",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "@radix-ui/react-select",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    elements: ["Select"],
  },
  "file-upload": {
    name: "file-upload",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "@radix-ui/react-slot",
      "react-dropzone",
    ],
    elements: ["Button"],
  },
  videos: {
    name: "Videos",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    elements: ["TimeAgo"],
  },
  "user-management": {
    name: "User Management",
    installationSteps: [
      "@cosmicjs/sdk@1.2.0",
      "lucide-react",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "@radix-ui/react-label",
      "clsx",
      "tailwind-merge",
      "resend",
      "bcryptjs",
      "@types/bcryptjs",
    ],
    elements: ["Button", "Input", "Label"],
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
    for (const component of components) {
      if (!Object.keys(blocks).includes(component)) {
        return console.error(
          chalk.red(
            `"${component}" is an invalid Block name. Please find a valid list of Blocks on ${chalk.bold(
              "https://blocks.cosmicjs.com."
            )}`
          )
        )
      } else {
        response = await addComponent(component)
      }
    }
  })

program.addCommand(addCommand)
program.parse()

export { addComponent }
