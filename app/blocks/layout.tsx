"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { blocksData } from "@/config/blocks.data"
import { Blocks } from "@/components/Blocks"
import BlockStats from "@/components/BlockStats"

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
    <div className="container relative mx-auto flex flex-col items-center justify-center sm:w-[80%] lg:w-full lg:max-w-[1400px] lg:flex-row">
      <main className="flex flex-col items-center justify-center">
        <h1 className="sticky mb-2 mt-20 bg-white text-3xl font-extrabold leading-tight tracking-tighter dark:bg-dark-background md:mt-6 md:text-4xl lg:pt-0">
          {title}
        </h1>
        <BlockStats
          objectTypes={object_types}
          objects={objects}
          metafields={metafields}
        />
        <div className="relative">{children}</div>
        {searchParams.get("tab") !== "install" && (
          <div className="mb-10 px-4 sm:px-0">
            Look good? Follow the steps to{" "}
            <Link href="?tab=install" className="text-cosmic-blue">
              install this Block
            </Link>
            .
          </div>
        )}
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
          <div className="mt-10 w-full text-center">
            <Link
              href="/#blocks"
              className="flex justify-center text-cosmic-blue"
            >
              <ArrowLeftIcon className="mr-2 mt-1 h-4 w-4" /> Back to all Blocks
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
