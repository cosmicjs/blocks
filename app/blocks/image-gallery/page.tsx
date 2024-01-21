/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { ImageGallery } from "@/components/ImageGallery"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import classNames from "classnames"
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

  const gallery = galleries[0]
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative m-auto w-full">
          <ImageGallery items={gallery.metadata.gallery} />
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

  const importCode = dedent`
  \`\`\`jsx
  import { ImageGallery } from "@/cosmic/blocks/image-gallery/ImageGallery";
  \`\`\`
  `

  const usageCode = dedent`
  \`\`\`jsx
  <ImageGallery query={{ type: "pages", slug: "home" }} />
  \`\`\`
  `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `gallery` repeater Metafield to the Object type(s) of your choice.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the file `ImageGallery.tsx` and `ImageGalleryClient.tsx` to `cosmic/blocks/image-gallery`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description: (
        <>
          Add the Block to your app with the `query` property set to fetch your
          specific content.{" "}
          <a
            href="https://www.cosmicjs.com/docs/api/queries"
            target="_blank"
            className="text-cosmic-blue"
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
