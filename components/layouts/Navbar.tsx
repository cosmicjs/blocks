"use client"

import React from "react"
import ThemeSwitch from "../elements/ThemeSwitch/ThemeSwitch"
import { Button } from "../ui/button"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { SiteHeader } from "../site-header"
import Link from "next/link"
import { useTheme } from "next-themes"

const Navbar: React.FC = () => {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="lg:flex-center glassmorphism sticky top-0 z-50 h-[76px] border-b border-gray-50 bg-white/70 px-5 dark:border-dark-gray-100 dark:bg-black/50 md:w-screen">
      <div className="mx-auto flex h-full items-center md:max-w-[1500px]">
        <Link href="/">
          <img
            src={`/assets/${theme === "dark" ? "logo-dark" : "logo-light"}.png`}
            alt="footer logo"
            className="w-32"
          />
        </Link>
        <div className="grow" />
        <SiteHeader />
        <div className="grow" />
        <div className="flex items-center">
          <Button
            variant={"ghost"}
            className="mr-2 text-cosmic-blue"
            iconRight={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
          >
            Cosmic Docs
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}
export default Navbar
