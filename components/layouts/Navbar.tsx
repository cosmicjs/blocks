"use client"

import React, { useState } from "react"
import ThemeSwitch from "../elements/ThemeSwitch/ThemeSwitch"
import { Button } from "../ui/button"
import { SiteHeader } from "../SiteHeader"
import Link from "next/link"
import BlocksMenu from "../BlocksMenu"
import { Github, KeyIcon } from "lucide-react"
import APIKeysDialog from "../APIKeysDialog"

const Navbar: React.FC = () => {
  const [showKeysModal, setShowKeysModal] = useState(false)
  return (
    <div className="lg:flex-center glassmorphism sticky top-0 z-50 h-[72px] bg-white/10 px-5 dark:bg-black/10 md:w-screen">
      <div className="mx-auto flex h-full items-center md:max-w-[1500px]">
        <div className="w-32 shrink-0">
          <Link href="/">
            <img
              alt="Cosmic Blocks"
              className="w-32 dark:hidden"
              src="https://imgix.cosmicjs.com/30de9890-aa64-11ee-b417-db331415685f-logo_light.png?w=300&auto=format,compression"
            />
            <img
              alt="Cosmic Blocks"
              className="hidden w-32 dark:block"
              src="https://imgix.cosmicjs.com/30dc4ea0-aa64-11ee-b417-db331415685f-logo_dark.png?w=300&auto=format,compression"
            />
          </Link>
        </div>
        <BlocksMenu />
        <div className="grow" />
        <SiteHeader />
        <div className="grow" />
        <div className="flex items-center">
          <Button variant={"ghost"} onClick={() => setShowKeysModal(true)}>
            <KeyIcon className="h-5 w-5" />
          </Button>
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
      {showKeysModal && (
        <APIKeysDialog onClose={() => setShowKeysModal(false)} />
      )}
    </div>
  )
}
export default Navbar
