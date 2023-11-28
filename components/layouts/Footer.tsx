"use client"

import { useTheme } from "next-themes"
import React from "react"

const Footer: React.FC = () => {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="mx-auto my-20 h-[40px]">
      <img
        src={`/assets/${theme === "dark" ? "footer-dark" : "footer-light"}.png`}
        alt="footer logo"
        className="w-32 pb-7"
      />
    </div>
  )
}
export default Footer
