/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { ImageGallery } from "@/components/image-gallery"
import CodeSteps from "@/components/layouts/CodeSteps"
import classNames from "classnames"

export async function generateMetadata() {
  return {
    title: `Image Gallery`,
  }
}

export default async function ImageGalleryPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "code"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section
        className={classNames("container m-auto grid items-center pb-8", {
          "max-w-[800px]": tab !== "preview",
          "max-w-[1200px]": tab === "preview",
        })}
      >
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { objects: galleries } = await cosmic.objects
    .find({
      type: "image-galleries",
    })
    .props("id,slug,title,metadata")
    .depth(1)

  const gallery = galleries[0]
  return (
    <>
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative m-auto w-full">
          <ImageGallery items={gallery.metadata.gallery} />
        </div>
      </section>
    </>
  )
}

function Code() {
  const codeString = dedent`
      \`\`\`jsx
        // app/page.tsx
        import { cosmic } from "@/lib/cosmic";
        import { ImageGallery } from "@/components/image-gallery";
        
        export default async function Home() {
          
          const { object: page } = await cosmic.objects
            .findOne({
              type: "pages",
              slug: "home",
            })
            .props("slug,title,metadata")
            .depth(1)
          
          return (
            <main className="container">
              {/* page content above */}
              {page.metadata.gallery && ( // check if exists
                <ImageGallery items={page.metadata.gallery} />
              )}
              {/* page content below */}
            </main>
          );
        }    
      \`\`\`
      `
  const codeImageGalleryString = dedent`
  \`\`\`jsx
    // components/image-gallery.tsx
    "use client";

    import { useState } from "react";
    import { cn } from "@/lib/utils";

    export type GalleryItemType = {
      image: {
        imgix_url: string;
      };
      description: string;
    };

    export function ImageGallery({ items }: { items: GalleryItemType[] }) {
      const [mainItem, setMainItem] = useState(items[0]);

      return (
        <>
          <div>
            <img
              src={\`\${mainItem.image.imgix_url}?w=1200&auto=format,compression\`}
              alt={mainItem.description}
              className="rounded-xl mb-4 h-80 w-full object-cover object-center"
            />
          </div>
          <div className="flex gap-x-2">
            {items.map((item: GalleryItemType) => {
              return (
                <div
                  onClick={() => setMainItem(item)}
                  key={item.image.imgix_url}
                  className={cn(
                    \`rounded-xl overflow-hidden border-4\`,
                    item.image.imgix_url === mainItem.image.imgix_url
                      ? "border-blue-500"
                      : ""
                  )}
                >
                  <img
                    src={\`\${item.image.imgix_url}?w=200&auto=format,compression\`}
                    className="h-20 w-20 object-cover object-center cursor-pointer"
                    alt={item.description}
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    }
  \`\`\`
  `

  const steps = [
    {
      title:
        "Add a new file located at `components/image-gallery.tsx` with the following",
      code: codeImageGalleryString,
    },
    {
      title:
        "Add the Image Gallery component to any file that needs an image gallery",
      code: codeString,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} preview={<Preview />} />
    </>
  )
}
