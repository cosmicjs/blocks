import { ImageGalleryClient } from "./ImageGalleryClient"
import { cosmic } from "@/cosmic/client"

export async function ImageGallery({
  query,
  className,
  preview,
}: {
  query: any
  className?: string
  preview?: boolean
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1)
    .status(preview ? "any" : "published")
  if (!page.metadata.gallery?.length) return <></>
  return (
    <ImageGalleryClient items={page.metadata.gallery} className={className} />
  )
}
