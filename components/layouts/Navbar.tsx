"use client"

import React from "react"
import ThemeSwitch from "../elements/ThemeSwitch/ThemeSwitch"
import { Button } from "../ui/button"
import { SiteHeader } from "../SiteHeader"
import Link from "next/link"
import BlocksMenu from "../BlocksMenu"
import { DOCS_URL } from "@/constants"
import { ExternalLinkIcon, Github } from "lucide-react"

const Navbar: React.FC = () => {
  return (
    <div className="lg:flex-center glassmorphism sticky top-0 z-50 h-[72px] bg-white/10 px-5 dark:bg-black/10 md:w-screen">
      <div className="mx-auto flex h-full items-center md:max-w-[1500px]">
        <div className="w-32 shrink-0">
          <Link href="/">
            <img
              alt="Cosmic Blocks"
              className="w-32 dark:hidden"
              src="https://imgix.cosmicjs.com/30de9890-aa64-11ee-b417-db331415685f-logo_light.png"
            />
            <img
              alt="Cosmic Blocks"
              className="hidden w-32 dark:block"
              src="https://imgix.cosmicjs.com/30dc4ea0-aa64-11ee-b417-db331415685f-logo_dark.png"
            />
          </Link>
        </div>
        <BlocksMenu />
        <div className="grow" />
        <SiteHeader />
        <div className="grow" />
        <div className="flex items-center">
          <Button
            variant={"ghost"}
            href={"https://github.com/cosmicjs/blocks"}
            target="_blank"
            className="mr-2"
          >
            <Github className="h-5 w-5" />
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}
export default Navbar
