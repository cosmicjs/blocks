const { exec } = require("child_process")

module.exports = {
  installPackages() {
    try {
      exec("bunx create-next-app@latest cosmic-app", (error) => {
        if (error) {
          console.error("Error installing required packages:", error)
          return
        }
        exec("cd cosmic-app", (error) => {
          if (error) {
            console.error("Error changing directory:", error)
            return
          }
          exec("bun add @cosmicjs/sdk", (error) => {
            if (error) {
              console.error("Error adding package:", error)
              return
            }
            console.log("Required packages installed successfully.")
          })
        })
      })
    } catch (error) {
      console.error("Error installing required packages:", error)
    }
  },

  getComponentCode() {
    const componentCodePath = path.join(__dirname, "component.tsx")
    try {
      if (fs.existsSync(componentCodePath)) {
        const componentCode = fs.readFileSync(componentCodePath, "utf8")
        return componentCode
      } else {
        console.error("Component code file not found.")
        return ""
      }
    } catch (error) {
      console.error("Error reading component code:", error)
      return ""
    }
  },
}
