import { blockGenerator } from "../../utils/block-generator.js"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

// Stays the same for all blocks
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const componentCodePath = path.join(__dirname, "component.tsx")

// Dynamic
// const executionSteps = ["shadcn-ui@latest init", "shadcn-ui@latest add button"]
const installationSteps = ["@cosmicjs/sdk"]

// Generator function, remains same for all blocks
async function generateBlock() {
  let componentCode
  try {
    componentCode = await blockGenerator({
      installationSteps,
      // executionSteps,
      componentCodePath,
    })
    return componentCode
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export { generateBlock }
