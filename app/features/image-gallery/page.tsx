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
        import { cosmic } from "@/cosmic/client";
        import { ImageGallery } from "@/cosmic/blocks/image-gallery/ImageGallery";
        
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
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add image-gallery
  \`\`\`
  `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `image_gallery` repeater Metafield to the Object type(s) of your choice.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the file `ImageGallery.tsx` to `cosmic/blocks/ImageGallery`.",
    },
    {
      title:
        "Add the Image Gallery block to any file that needs an image gallery",
      code: codeString,
    },
  ]

  return (
    <>
      <CodeSteps
        steps={steps}
        preview={<Preview />}
        featureKey="image-gallery"
      />
    </>
  )
}
