"use client"

import { ExternalLinkIcon } from "lucide-react"

export function BucketAPILink() {
  return (
    <>
      {localStorage.getItem("bucket_slug") ? (
        <a
          href={`https://app.cosmicjs.com/${localStorage.getItem(
            "bucket_slug"
          )}/settings/api-access`}
          className="text-cosmic-blue"
          target="_blank"
          rel="noreferrer"
        >
          Bucket {`>`} Setting {`>`} API keys{" "}
          <ExternalLinkIcon className="-mt-2 inline h-3 w-3" />
        </a>
      ) : (
        <>
          Bucket {`>`} Setting {`>`} API keys
        </>
      )}
    </>
  )
}
