"use client"

import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader({ page, tab }: { page: string; tab?: string }) {
  if (!tab) tab = "preview"
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-light-background dark:bg-dark-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        {page === "preview" ? (
          <div className="flex flex-1 justify-center text-center">
            <div
              className="flex rounded-lg bg-gray-100 p-[2px] dark:bg-dark-gray-100"
              role="tablist"
            >
              <Link
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-2 text-center font-semibold text-gray-600 dark:text-dark-gray-600",
                  tab === "preview"
                    ? "bg-white dark:bg-dark-background"
                    : "bg-transparent"
                )}
                role="tab"
                aria-selected="false"
                aria-disabled="false"
                href="?tab=preview"
              >
                Preview
              </Link>
              <Link
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-2 text-center font-semibold text-gray-500 dark:text-dark-gray-500",
                  tab === "code"
                    ? "bg-white dark:bg-dark-background"
                    : "bg-transparent"
                )}
                href="?tab=code"
              >
                Code
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.x} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.x className="h-5 w-5 fill-current" />
                <span className="sr-only">X</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
