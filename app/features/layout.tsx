"use client"

import SelectMenu from "@/components/elements/SelectMenu/SelectMenu"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useQueryState } from "next-usequerystate"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import classNames from "classnames"
import { Features } from "@/components/features"

const options = [
  { title: "bun", value: "bun" },
  { title: "npm", value: "npm" },
  { title: "yarn", value: "yarn" },
  { title: "pnpm", value: "pnpm" },
]

export type PackageManagers = (typeof options)[number]["value"]

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const manager = searchParams.get("pm")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="container relative mx-auto flex w-[80%] flex-col lg:w-full lg:max-w-[1400px] lg:flex-row">
      <aside className="mx-auto mt-10 w-20 rounded-xl lg:fixed lg:mx-4 lg:mt-8">
        <nav>
          <Link
            href="/"
            className="mb-4 mt-5 flex items-center space-x-4 text-cosmic-blue lg:mt-0"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Link>
          <SelectMenu
            options={options}
            value={manager ? { title: manager, value: manager } : options[0]}
            onChange={(option) => {
              router.push(
                pathname + "?" + createQueryString("pm", option.value)
              )
            }}
          />
        </nav>
      </aside>
      <main className="flex flex-col items-center justify-center">
        <div className="relative">{children}</div>
        <div className="relative">
          <h3 className="mb-10 pt-10 text-center text-3xl font-extrabold text-gray-700 dark:text-dark-gray-700">
            More to explore
          </h3>
          <Features randomOrder limit={3} />
        </div>
      </main>
    </div>
  )
}
