// components/image-gallery.tsx
"use client"

import Zoom from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

import { useState } from "react"

import { cn } from "@/lib/utils"

export type GalleryItemType = {
  imgix_url: string
  alt_text: string
}

export function ImageGallery({ items }: { items: GalleryItemType[] }) {
  const [mainItem, setMainItem] = useState(items[0])

  return (
    <>
      <div>
        <Zoom classDialog="custom-zoom">
          <img
            src={`${mainItem.imgix_url}?w=1200&auto=format,compression`}
            alt={mainItem.alt_text}
            className="mb-4 h-[350px] w-full rounded-xl object-cover object-center"
          />
        </Zoom>
      </div>
      <div className="flex gap-x-2">
        {items.map((item: GalleryItemType) => {
          return (
            <div
              onClick={() => setMainItem(item)}
              key={item.imgix_url}
              className={cn(
                `overflow-hidden rounded-xl border-4`,
                item.imgix_url === mainItem.imgix_url
                  ? "border-cosmic-blue"
                  : ""
              )}
            >
              <img
                src={`${item.imgix_url}?w=200&auto=format,compression`}
                className="h-20 w-20 cursor-pointer object-cover object-center"
                alt={item.alt_text}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
