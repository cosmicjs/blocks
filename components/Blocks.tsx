/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

import { blocksData } from "@/config/blocks.data"
import { BlockCard } from "@/components/BlockCard"
import { selectRandomValuesFromArray } from "@/lib/utils"

// Types
export type TargetBucketType = {
  bucket_slug: string
  read_key: string
  write_key: string
}
export type BlocksProps = {
  targetBucket?: TargetBucketType
  limit?: number
  randomOrder?: boolean
  excludeSelf?: boolean
}

export function Blocks({
  targetBucket,
  limit,
  randomOrder,
  excludeSelf,
}: BlocksProps) {
  const searchParams = useSearchParams()
  const dashboardTheme = searchParams.get("theme")
  const { setTheme } = useTheme()
  const pathname = usePathname()

  const blockPathname = pathname.includes("blocks")
    ? pathname.split("/")[2]
    : "null"

  if (dashboardTheme) {
    setTheme(dashboardTheme)
  }
  if (targetBucket) {
    let bucket_slug = targetBucket.bucket_slug
    let read_key = targetBucket.read_key
    let write_key = targetBucket.write_key
    if (typeof window !== "undefined" && bucket_slug) {
      localStorage.setItem("bucket_slug", bucket_slug)
      localStorage.setItem("read_key", read_key)
      localStorage.setItem("write_key", write_key)
    }
  }

  const [mappedBlocks, setMappedBlocks] = useState(blocksData)

  useEffect(() => {
    let mappedBlocks = blocksData

    if (excludeSelf) {
      mappedBlocks = mappedBlocks.filter(
        (feature) => !feature?.preview_link?.includes(blockPathname)
      )
    }

    if (randomOrder) {
      mappedBlocks = selectRandomValuesFromArray(mappedBlocks, limit || 3)
    }

    setMappedBlocks(mappedBlocks)
  }, [randomOrder, limit, excludeSelf, blockPathname])

  useEffect(() => {}, [excludeSelf, blockPathname])

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {mappedBlocks?.map((block) => {
        return (
          <div key={block?.key}>
            <BlockCard feature={block} />
          </div>
        )
      })}
    </div>
  )
}
