// ImageGalleryClient.tsx
"use client"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import { useState } from "react"
import { cn } from "@/cosmic/utils"

export type GalleryItemType = {
  image: {
    imgix_url: string
  }
  description: string
}

export function ImageGalleryClient({ items }: { items: GalleryItemType[] }) {
  const [mainItem, setMainItem] = useState(items[0])
  let num = 0
  return (
    <>
      <div>
        <Zoom>
          <img
            src={`${mainItem.image.imgix_url}?w=1200&auto=format,compression`}
            alt={mainItem.description}
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
                item.image.imgix_url === mainItem.image.imgix_url
                  ? "border-blue-500"
                  : ""
              )}
            >
              <img
                src={`${item.image.imgix_url}?w=200&auto=format,compression`}
                className="h-20 w-20 cursor-pointer object-cover object-center"
                alt={item.description}
              />
              <img
                src={`${mainItem.image.imgix_url}?w=1200&auto=format,compression`}
                alt={mainItem.description}
                className="hidden" // prefetch
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
