/* eslint-disable @next/next/no-img-element */
import classNames from "classnames"
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CarouselGallery } from "@/components/Carousel"
import { ImageGallery } from "@/components/ImageGallery"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

export async function generateMetadata() {
  return {
    title: `Image Gallery`,
  }
}

export default async function ImageGalleryPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "install"
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
    .options({
      media: {
        props: "alt_text",
      },
    })

  const gallery = galleries[0]
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <section className="container m-auto grid max-w-[700px] items-center px-4 py-8">
        <div className="relative m-auto mb-12 w-full">
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Image Gallery
          </h1>
          <ImageGallery items={gallery.metadata.gallery} />
        </div>
        <div className="relative m-auto w-full">
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Image Carousel
          </h1>
          <CarouselGallery
            className="px-8 md:px-12"
            items={gallery.metadata.gallery}
          />
        </div>
      </section>
    </div>
  )
}

function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add image-gallery
  \`\`\`
  `

  const importGalleryCode = dedent`
  \`\`\`jsx
  import { ImageGallery } from "@/cosmic/blocks/image-gallery/ImageGallery";
  \`\`\`
  `

  const usageGalleryCode = dedent`
  \`\`\`jsx
  <ImageGallery query={{ type: "pages", slug: "home" }} />
  \`\`\`
  `

  const importCarouselCode = dedent`
  \`\`\`jsx
  import { ImageCarousel } from "@/cosmic/blocks/image-gallery/ImageCarousel";
  \`\`\`
  `

  const usageCarouselCode = dedent`
  \`\`\`jsx
  <ImageCarousel query={{ type: "pages", slug: "home" }} />
  \`\`\`
  `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `gallery` multi media Metafield to the Object type(s) of your choice.",
      installButton: true,
    },
    {
      title: "Install the Gallery Block code",
      code: blockCommand,
      description:
        "This will add the file `ImageGallery.tsx`, `ImageGalleryClient.tsx`,`ImageCarousel.tsx`, `ImageCarouselClient.tsx` to `cosmic/blocks/image-gallery`.",
    },
    {
      title: "Import Gallery Block",
      code: importGalleryCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage: Gallery",
      code: usageGalleryCode,
      description: (
        <>
          Add the Block to your app with the `query` property set to fetch your
          specific content.{" "}
          <a
            href="https://www.cosmicjs.com/docs/api/queries"
            target="_blank"
            className="text-cosmic-blue"
            rel="noreferrer"
          >
            Read more about queries in the docs
          </a>
          .
        </>
      ),
    },
    {
      title: "Import Carousel Block",
      code: importCarouselCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage: Carousel",
      code: usageCarouselCode,
      description: (
        <>
          Add the Block to your app with the `query` property set to fetch your
          specific content.{" "}
          <a
            href="https://www.cosmicjs.com/docs/api/queries"
            target="_blank"
            className="text-cosmic-blue"
            rel="noreferrer"
          >
            Read more about queries in the docs
          </a>
          .
        </>
      ),
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="image-gallery" />
    </>
  )
}
