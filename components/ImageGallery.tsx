// components/image-gallery.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export type GalleryItemType = {
  image: {
    imgix_url: string
  }
  description: string
}

export function ImageGallery({ items }: { items: GalleryItemType[] }) {
  const [mainItem, setMainItem] = useState(items[0])

  return (
    <>
      <div>
        <img
          src={`${mainItem.image.imgix_url}?w=1200&auto=format,compression`}
          alt={mainItem.description}
          className="mb-4 h-[350px] w-full rounded-xl object-cover object-center"
        />
      </div>
      <div className="flex gap-x-2">
        {items.map((item: GalleryItemType) => {
          return (
            <div
              onClick={() => setMainItem(item)}
              key={item.image.imgix_url}
              className={cn(
                `overflow-hidden rounded-xl border-4`,
                item.image.imgix_url === mainItem.image.imgix_url
                  ? "border-cosmic-blue"
                  : ""
              )}
            >
              <img
                src={`${item.image.imgix_url}?w=200&auto=format,compression`}
                className="h-20 w-20 cursor-pointer object-cover object-center"
                alt={item.description}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
