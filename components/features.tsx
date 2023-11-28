/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

import { features } from "@/config/features"
import { FeatureCard } from "@/components/feature-card"
import { InstallDialog } from "@/components/install-dialog"
import { selectRandomValuesFromArray } from "@/lib/utils"
import { useMemo } from "react"

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
}

export function Features({ targetBucket, limit, randomOrder }: FeaturesProps) {
  const searchParams = useSearchParams()
  const dashboardTheme = searchParams.get("theme")
  const { setTheme } = useTheme()
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

  const [showModal, setShowModal] = useState<boolean>(false)
  const [featureKey, setFeatureKey] = useState<string>("")

  function handleInstallClick(key: string) {
    setShowModal(true)
    setFeatureKey(key)
  }

  const mappedFeatures = useMemo(() => {
    return !!randomOrder
      ? selectRandomValuesFromArray(features, limit || features.length)
      : features
  }, [randomOrder, features, limit])

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {mappedFeatures?.map((feature) => {
        return (
          <div key={feature.key}>
            <FeatureCard
              feature={feature}
              handleInstallClick={targetBucket ? handleInstallClick : undefined}
            />
          </div>
        )
      })}
      {showModal && (
        <InstallDialog featureKey={featureKey} setShowModal={setShowModal} />
      )}
    </div>
  )
}
