import { ExternalLinkIcon } from "lucide-react"

export function BucketAPILink() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("bucket_slug")) {
      return (
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
      )
    } else {
      return (
        <>
          Bucket {`>`} Setting {`>`} API keys
        </>
      )
    }
  } else {
    return null // or handle the case when window is not available
  }
}
