/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

import { features } from "@/config/features"
import { FeatureCard } from "@/components/feature-card"
import { InstallDialog } from "@/components/install-dialog"

// Types
export type TargetBucketType = {
  bucket_slug: string
  read_key: string
  write_key: string
}
export type FeaturesProps = {
  targetBucket: TargetBucketType
}

export function Features({ targetBucket }: FeaturesProps) {
  const searchParams = useSearchParams()
  const dashboardTheme = searchParams.get("theme")
  const { setTheme, theme } = useTheme()
  if (dashboardTheme) {
    setTheme(dashboardTheme)
  }

  const [bucketSlug, setBucketSlug] = useState(targetBucket.bucket_slug)
  const [readKey, setReadKey] = useState(targetBucket.read_key)
  const [writeKey, setWriteKey] = useState(targetBucket.write_key)

  useEffect(() => {
    if (bucketSlug) {
      localStorage.setItem("bucket_slug", bucketSlug)
      localStorage.setItem("read_key", readKey)
      localStorage.setItem("write_key", writeKey)
    }

    const localBucketSlug = localStorage.getItem("bucket_slug")
    const localReadKey = localStorage.getItem("read_key")
    const localWriteKey = localStorage.getItem("write_key")

    if (localBucketSlug) setBucketSlug(localBucketSlug)

    if (localReadKey) setReadKey(localReadKey)

    if (localWriteKey) setWriteKey(localWriteKey)
  }, [])

  const [showModal, setShowModal] = useState<boolean>(false)
  const [featureKey, setFeatureKey] = useState<string>("")

  function handleInstallClick(key: string) {
    setShowModal(true)
    setFeatureKey(key)
  }

  return (
    <div>
      {features.map((feature) => {
        return (
          <div key={feature.key}>
            <FeatureCard
              feature={feature}
              handleInstallClick={handleInstallClick}
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