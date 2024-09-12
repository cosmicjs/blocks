// ImageGalleryClient.tsx
"use client"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import { useState } from "react"
import { cn } from "@/cosmic/utils"

export type GalleryItemType = {
  imgix_url: string
  alt_text: string
}

export function ImageGalleryClient({ items }: { items: GalleryItemType[] }) {
  const [mainItem, setMainItem] = useState(items[0])
  let num = 0
  return (
    <>
      <div>
        <Zoom>
          <img
            src={`${mainItem.imgix_url}?w=1200&auto=format,compression`}
            alt={mainItem.alt_text}
            className="mb-4 h-[350px] w-full rounded-xl object-cover object-center"
          />
        </Zoom>
      </div>
      <div className="flex gap-x-2">
        {items.map((item: GalleryItemType) => {
          const id = `item-${num++}`
          return (
            <div
              onClick={() => setMainItem(item)}
              key={id}
              className={cn(
                `overflow-hidden rounded-xl border-4`,
                item.imgix_url === mainItem.imgix_url ? "border-blue-500" : ""
              )}
            >
              <img
                src={`${item.imgix_url}?w=200&auto=format,compression`}
                className="h-20 w-20 cursor-pointer object-cover object-center"
                alt={item.alt_text}
              />
              <img
                src={`${mainItem.imgix_url}?w=1200&auto=format,compression`}
                alt={mainItem.alt_text}
                className="hidden" // prefetch
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
