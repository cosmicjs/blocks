import { useEffect, useState } from "react"
import { useTheme, ThemeProvider } from "next-themes"

export function useCustomTheme() {
  const { resolvedTheme, setTheme } = useTheme()
  const [initialThemeSet, setInitialThemeSet] = useState(false)

  useEffect(() => {
    if (!initialThemeSet) {
      setTheme("dark") // Set the initial theme to 'dark' or 'light' based on your preference
      setInitialThemeSet(true)
    }

    const themeChangeHandler = (newTheme: string) => {
      setTheme(newTheme)
    }

    // Listen for theme changes
    window.addEventListener(
      "themeChange",
      themeChangeHandler as unknown as EventListener
    )

    return () => {
      // Clean up the event listener
      window.removeEventListener(
        "themeChange",
        themeChangeHandler as unknown as EventListener
      )
    }
  }, [initialThemeSet, setTheme])

  return { resolvedTheme, setTheme }
}
