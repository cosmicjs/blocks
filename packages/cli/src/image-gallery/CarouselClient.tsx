// components/image-gallery.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/cosmic/elements/Carousel";

type GalleryItemType = {
  image: {
    imgix_url: string;
  };
  description: string;
};

export function CarouselClient({
  items,
  className,
}: {
  items: GalleryItemType[];
  className?: string;
}) {
  let num = 0;
  return (
    <div className={className}>
      <Carousel>
        <CarouselContent>
          {items.map((item: GalleryItemType) => {
            const id = `item-${num++}`;
            return (
              <CarouselItem key={id} className="cursor-grab">
                <img
                  src={`${item.image.imgix_url}?w=1200&auto=format,compression`}
                  className="w-full object-cover object-center"
                  alt={item.description}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
