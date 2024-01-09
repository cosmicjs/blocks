"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Blocks } from "@/components/Blocks"
import { blocksData } from "@/config/blocks.data"
import BlockStats from "@/components/BlockStats"

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
    blocksData?.filter(
      (block) => block?.preview_link.includes(featurePathname)
    )?.[0] || {}

  const { title, object_types, objects, metafields } = currentFeature

  const bucketSlug = searchParams.get("bucket_slug") || ""
  const readKey = searchParams.get("read_key") || ""
  const writeKey = searchParams.get("write_key") || ""

  const targetBucket = {
    bucket_slug: bucketSlug,
    read_key: readKey,
    write_key: writeKey,
  }

  return (
    <div className="container relative mx-auto flex w-[80%] flex-col items-center justify-center lg:w-full lg:max-w-[1400px] lg:flex-row">
      <main className="flex flex-col items-center justify-center">
        <h1 className="sticky mb-2 mt-20 bg-white pt-10 text-3xl font-extrabold leading-tight tracking-tighter dark:bg-dark-background md:mt-6 md:text-4xl lg:pt-0">
          {title}
        </h1>
        <BlockStats
          objectTypes={object_types}
          objects={objects}
          metafields={metafields}
        />
        <div className="relative">{children}</div>
        <div className="relative px-4">
          <h3 className="mb-10 pt-10 text-center text-3xl font-extrabold text-gray-700 dark:text-dark-gray-700">
            More to explore
          </h3>
          <Blocks
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
