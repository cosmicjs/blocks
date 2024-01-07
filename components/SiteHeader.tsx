"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSearchParams, usePathname } from "next/navigation"

export function SiteHeader() {
  const searchParams = useSearchParams()
  let tab = searchParams.get("tab")

  const pathname = usePathname()

  if (pathname === "/") return null

  if (!tab) tab = "preview"

  return (
    <header className="absolute inset-0 top-[60px] z-40 mx-auto w-full max-w-[53%] lg:sticky lg:inset-auto lg:top-0 lg:mx-0">
      <div className="container flex h-16 items-center justify-center sm:space-x-0 lg:flex-row lg:justify-between lg:space-x-4">
        <div className="relative flex grow justify-center text-center lg:left-[-112px] lg:flex-1">
          <div
            className="flex rounded-lg bg-gray-100 p-[2px] text-xs dark:bg-dark-gray-100 lg:text-base"
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
      </div>
    </header>
  )
}
