"use client"

import React from "react"
import ThemeSwitch from "../elements/ThemeSwitch/ThemeSwitch"
import { Button } from "../ui/button"
import { SiteHeader } from "../SiteHeader"
import Link from "next/link"
import FeaturesMenu from "../FeaturesMenu"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"
import { DOCS_URL } from "@/constants"
import { ExternalLinkIcon } from "lucide-react"

const Navbar: React.FC = () => {
  return (
    <div className="lg:flex-center glassmorphism sticky top-0 z-50 h-[76px] border-b border-gray-50 bg-white/70 px-5 dark:border-dark-gray-100 dark:bg-black/50 md:w-screen">
      <div className="mx-auto flex h-full items-center md:max-w-[1500px]">
        <div className="w-32 shrink-0">
          <Link href="/">
            <ThemedImage
              lightSrc={`/assets/logo-light.png`}
              darkSrc={`/assets/logo-dark.png`}
              alt="nav logo"
              className="w-32"
            />
          </Link>
        </div>
        <FeaturesMenu />
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
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}
export default Navbar
