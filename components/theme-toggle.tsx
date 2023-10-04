"use client"

import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const searchParams = useSearchParams()
  const dashboardTheme = searchParams.get("theme")
  const { setTheme, theme } = useTheme()
  if (dashboardTheme) {
    setTheme(dashboardTheme)
    return <></>
  }
}
