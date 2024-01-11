"use client"

import { DASHBOARD_URL } from "@/constants"
import { ExternalLinkIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function BucketAPILink() {
  const [bucketSlug, setBucketSlug] = useState<string>()

  useEffect(() => {
    const storedBucketSlug = localStorage.getItem("bucket_slug")
    if (storedBucketSlug) {
      setBucketSlug(storedBucketSlug)
    }
  }, [])
  let link = `${DASHBOARD_URL}?redirect_to=?highlight=api-keys`
  if (bucketSlug)
    link = `https://app.cosmicjs.com/${bucketSlug}/settings/api-access`
  return (
    <a
      href={link}
      className="text-cosmic-blue"
      target="_blank"
      rel="noreferrer"
    >
      Project {`>`} Bucket {`>`} API keys{" "}
      <ExternalLinkIcon className="-mt-2 inline h-3 w-3" />
    </a>
  )
}
