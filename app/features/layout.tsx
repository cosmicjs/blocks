"use client"

import SelectMenu from "@/components/elements/SelectMenu/SelectMenu"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Features } from "@/components/features"
import { features } from "@/config/features"
import classNames from "classnames"
import FeatureStats from "@/components/FeatureStats"

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
  const manager = searchParams.get("pm")
  const tab = searchParams.get("tab")
  const featurePathname = pathname.includes("features")
    ? pathname.split("/")[2]
    : "null"

  const currentFeature =
    features?.filter(
      (feature) => feature?.preview_link.includes(featurePathname)
    )?.[0] || {}

  const { title, object_types, objects, metafields, description, field_list } =
    currentFeature

  const bucketSlug = searchParams.get("bucket_slug") || ""
  const readKey = searchParams.get("bucket_slug") || ""
  const writeKey = searchParams.get("bucket_slug") || ""

  const targetBucket = {
    bucket_slug: bucketSlug,
    read_key: readKey,
    write_key: writeKey,
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="container relative flex w-[80%] flex-col items-center justify-center lg:w-full lg:max-w-[1400px] lg:flex-row">
      <aside className="top-16 mt-10 flex w-full max-w-[1200px] flex-col items-center justify-center space-y-2 rounded-xl lg:fixed lg:mx-4 lg:mt-8 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
        <nav>
          <Link
            href="/#features"
            className="mt-5 flex items-center space-x-4 text-cosmic-blue lg:mb-4 lg:mt-0"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Link>
        </nav>
        {tab === "code" && (
          <div
            className={classNames("w-32 rounded-xl", {
              "pointer-events-none opacity-0": tab !== "code",
            })}
          >
            <nav className="pl-4">
              <div className="mb-px shrink-0 whitespace-nowrap text-xs uppercase text-gray-400 dark:text-dark-gray-400">
                Package manager
              </div>
              <SelectMenu
                options={options}
                value={
                  manager ? { title: manager, value: manager } : options[0]
                }
                onChange={(option) => {
                  router.push(
                    pathname + "?" + createQueryString("pm", option.value)
                  )
                }}
              />
            </nav>
          </div>
        )}
      </aside>
      <main className="flex flex-col items-center justify-center">
        <h1 className="sticky mb-2 mt-6 bg-white text-3xl font-extrabold leading-tight tracking-tighter dark:bg-dark-background md:text-4xl">
          {title}
        </h1>
        <FeatureStats
          objectTypes={object_types}
          objects={objects}
          metafields={metafields}
        />
        <p className="mt-5 max-w-[600px] text-center text-base text-gray-700 dark:text-dark-gray-600">
          {description}{" "}
          {field_list?.map((field, index) => (
            <span className="mx-[3px]">
              <span className="bg-gray-100 p-px dark:bg-dark-gray-100">
                {field}
              </span>
              {index !== field_list.length - 1 && ","}
            </span>
          ))}
        </p>
        <div className="relative">{children}</div>
        <div className="relative">
          <h3 className="mb-10 pt-10 text-center text-3xl font-extrabold text-gray-700 dark:text-dark-gray-700">
            More to explore
          </h3>
          <Features
            targetBucket={targetBucket}
            randomOrder
            limit={3}
            excludeSelf
          />
        </div>
      </main>
    </div>
  )
}
