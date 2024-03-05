// components/Carousel.tsx
"use client"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type GalleryItemType = {
  image: {
    imgix_url: string
  }
  description: string
}

export function CarouselGallery({
  items,
  className,
}: {
  items: GalleryItemType[]
  className?: string
}) {
  let num = 0
  return (
    <div className={className}>
      <Carousel>
        <CarouselContent>
          {items.map((item: GalleryItemType) => {
            const id = `item-${num++}`
            return (
              <CarouselItem key={id} className="flex cursor-grab items-center">
                <Zoom>
                  <img
                    src={`${item.image.imgix_url}?w=1200&auto=format,compression`}
                    className="w-full object-cover object-center"
                    alt={item.description}
                  />
                </Zoom>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
