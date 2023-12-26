const path = require("path")

function updateTailwindFile(cosmicFolderPath) {
  // Get the current working directory
  const rootDir = process.cwd()

  // Construct the absolute path to the Tailwind config file
  const tailwindConfigPath = path.resolve(rootDir, "tailwind.config.js")

  // Import the Tailwind config file.
  const tailwindConfig = require(tailwindConfigPath)

  // Check if the cosmicFolderPath is included in the Tailwind config file.
  const isCosmicFolderPathIncluded =
    tailwindConfig.content.includes(cosmicFolderPath)

  // If the cosmicFolderPath is not included, add it to the config file.
  if (!isCosmicFolderPathIncluded) {
    tailwindConfig.content.push(cosmicFolderPath)

    // Update the Tailwind config file.
    const fs = require("fs")
    fs.writeFileSync(
      tailwindConfigPath,
      `module.exports = ${JSON.stringify(tailwindConfig, null, 2)}`
    )
  }
  console.log("-> Tailwind file updated successfully!")
}

module.exports = updateTailwindFile
