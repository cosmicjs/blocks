import { ImageGalleryClient } from "./ImageGalleryClient"
import { cosmic } from "@/cosmic/client"

export async function ImageGallery({ query }: { query: any }) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1)
  return <ImageGalleryClient items={page.metadata.gallery} />
}
