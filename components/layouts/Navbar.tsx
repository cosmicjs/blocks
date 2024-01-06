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
            href={DOCS_URL}
            target="_blank"
            variant={"ghost"}
            className="mr-2 whitespace-nowrap text-cosmic-blue"
            iconRight={<ExternalLinkIcon className="h-4 w-4" />}
          >
            Cosmic Docs
          </Button>
          <Button
            variant={"ghost"}
            href={"https://github.com/cosmicjs/blocks"}
            className="mr-2"
          >
            <Github />
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}
export default Navbar
