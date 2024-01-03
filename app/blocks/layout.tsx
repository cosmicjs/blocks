"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Features } from "@/components/Features"
import { features } from "@/config/features"
import FeatureStats from "@/components/FeatureStats"
import { ArrowLeftIcon } from "lucide-react"

export const packageManagers = [
  { title: "bun", value: "bun" },
  { title: "npm", value: "npm" },
  { title: "yarn", value: "yarn" },
  { title: "pnpm", value: "pnpm" },
]

export type PackageManagers = (typeof packageManagers)[number]["value"]

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const featurePathname = pathname.includes("blocks")
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

  return (
    <div className="container relative mx-auto flex w-[80%] flex-col items-center justify-center lg:w-full lg:max-w-[1400px] lg:flex-row">
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
