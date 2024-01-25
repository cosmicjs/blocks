// components/image-gallery.tsx
import { CarouselClient } from "./CarouselClient";
import { cosmic } from "@/cosmic/client";

export async function Carousel({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("id,title,metadata")
    .depth(1)
    .status(status ? status : "published");
  return (
    <div className={`m-auto max-w-[800px] p-16 ${className}`}>
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
        <CarouselClient items={page.metadata.gallery} />
      )}
    </div>
  );
}
