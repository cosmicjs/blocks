"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InstallDialog } from "@/components/install-dialog"

export function SiteHeader({
  tab,
  featureKey,
}: {
  tab?: string
  featureKey: string
}) {
  const [showModal, setShowModal] = useState<boolean>(false)
  if (!tab) tab = "preview"
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-light-background dark:bg-dark-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-4">
          <ArrowLeftIcon className="mr-4 h-4 w-4" /> Back
        </Link>
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
        <div>
          <Button onClick={() => setShowModal(true)}>Install</Button>
        </div>
      </div>
      {showModal && (
        <InstallDialog featureKey={featureKey} setShowModal={setShowModal} />
      )}
    </header>
  )
}
