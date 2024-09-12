// ImageCarouselClient.tsx
"use client"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/cosmic/elements/Carousel"

type GalleryItemType = {
  imgix_url: string
  alt_text: string
}

export function ImageCarouselClient({ items }: { items: GalleryItemType[] }) {
  let num = 0
  return (
    <>
      <Carousel>
        <CarouselContent>
          {items.map((item: GalleryItemType) => {
            const id = `item-${num++}`
            return (
              <CarouselItem key={id} className="flex cursor-grab items-center">
                <Zoom>
                  <img
                    src={`${item.imgix_url}?w=1200&auto=format,compression`}
                    className="w-full object-cover object-center"
                    alt={item.alt_text}
                  />
                </Zoom>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
