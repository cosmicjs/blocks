"use client"

import { ThemeProvider as RealThemeProvider } from "next-themes"
import { ReactNode } from "react"

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <RealThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </RealThemeProvider>
  )
}

export default Providers
