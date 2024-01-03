/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

import { features } from "@/config/features"
import { FeatureCard } from "@/components/FeatureCard"
import { selectRandomValuesFromArray } from "@/lib/utils"

// Types
export type TargetBucketType = {
  bucket_slug: string
  read_key: string
  write_key: string
}
export type FeaturesProps = {
  targetBucket?: TargetBucketType
  limit?: number
  randomOrder?: boolean
  excludeSelf?: boolean
}

export function Features({
  targetBucket,
  limit,
  randomOrder,
  excludeSelf,
}: FeaturesProps) {
  const searchParams = useSearchParams()
  const dashboardTheme = searchParams.get("theme")
  const { setTheme } = useTheme()
  const pathname = usePathname()

  const featurePathname = pathname.includes("blocks")
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

  const [mappedFeatures, setMappedFeatures] = useState(features)

  useEffect(() => {
    let mappedFeatures = features

    if (excludeSelf) {
      mappedFeatures = mappedFeatures.filter(
        (feature) => !feature?.preview_link?.includes(featurePathname)
      )
    }

    if (randomOrder) {
      mappedFeatures = selectRandomValuesFromArray(mappedFeatures, limit || 3)
    }

    setMappedFeatures(mappedFeatures)
  }, [randomOrder, limit, excludeSelf, featurePathname])

  useEffect(() => {}, [excludeSelf, featurePathname])

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {mappedFeatures?.map((feature) => {
        return (
          <div key={feature?.key}>
            <FeatureCard feature={feature} />
          </div>
        )
      })}
    </div>
  )
}
