// ImageCarousel.tsx
import { ImageCarouselClient } from "./ImageCarouselClient"
import { cosmic } from "@/cosmic/client"

export async function ImageCarousel({
  query,
  className,
  status,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("id,title,metadata")
    .depth(1)
    .status(status ? status : "published")
    .options({
      media: {
        props: "alt_text",
      },
    })
  return (
    <div
      className={`m-auto max-w-[800px] px-14 ${className}`}
      data-cosmic-object={page.id}
    >
      {!page.metadata?.gallery?.length ? (
        <div className="rounded-xl border border-orange-400 p-6 text-center text-orange-400">
          No images added to the {page.title} Object image gallery yet.{" "}
          <a
            href={`https://app.cosmicjs.com/${process.env.COSMIC_BUCKET_SLUG}/objects/${page.id}`}
            className="text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            Add images ↗
          </a>
        </div>
      ) : (
        <ImageCarouselClient items={page.metadata.gallery} />
      )}
    </div>
  )
}
