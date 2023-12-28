/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import CodeSteps from "@/components/layouts/CodeSteps"

export default async function SEO({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { object: seo } = await cosmic.objects
    .findOne({
      type: "seo-fields",
      slug: "seo",
    })
    .props("metadata")
    .depth(1)

  return (
    <div className="m-auto mt-10 w-full md:min-w-[200px]">
      <h2 className="mb-4 text-2xl font-semibold">SEO fields</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Title</h3>
        <Markdown>{seo.metadata.seo.title}</Markdown>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Description</h3>
        <Markdown>{seo.metadata.seo.description}</Markdown>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">OG Title</h3>
        <Markdown>{seo.metadata.seo.og_title}</Markdown>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">OG Description</h3>
        <Markdown>{seo.metadata.seo.og_description}</Markdown>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">OG Image</h3>
        <img
          src={`${seo.metadata.seo.og_image.imgix_url}?w=1200&auto=format,compression`}
          className="w-[600px]"
        />
      </div>
    </div>
  )
}
function Code() {
  const codeString = dedent`
      \`\`\`jsx
        // app/page.tsx
        import { cosmic } from "@/cosmic/client";

        export async function generateMetadata() {
          const { object: page } = await cosmic.objects
            .findOne({
              type: "pages",
              slug: "home"
            })
            .props("title,metadata")
            .depth(1);
          return {
            title: page.metadata.seo?.title || page.title,
            description: page.metadata?.seo.description,
            openGraph: {
              title: page.metadata.seo?.og_title,
              description: page.metadata.seo?.og_description,
              images: [page.metadata.seo?.og_image?.imgix_url],
            },
          };
        }
        
        export default async function HomePage() {
          return (
            <>
              { /* Page content here. See Page block. */ }
            </>
          );
        }
      \`\`\`
      `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `seo` parent Metafield to the Object type(s) of your choice.",
      installButton: true,
    },
    {
      title:
        " Add the following `generateMetadata` function to any file that needs SEO",
      code: codeString,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} preview={<Preview />} featureKey="seo" />
      <div className="mb-6">
        <h3 className="mb-6 text-2xl font-semibold">Next steps</h3>
        <div className="mb-6">
          1. To test your open graph values locally, use something like{" "}
          <a
            className="text-cosmic-blue"
            target="_blank"
            rel="noreferrer"
            href="https://ngrok.com/"
          >
            Ngrok
          </a>{" "}
          to create a tunnel to your local URL, then add the generated URL to{" "}
          <a
            className="text-cosmic-blue"
            target="_blank"
            rel="noreferrer"
            href="https://www.opengraph.xyz/"
          >
            opengraph.xyz
          </a>
          .
        </div>
        <div className="mb-6">
          2. For more page metadata information and examples, go the{" "}
          <a
            className="text-cosmic-blue"
            target="_blank"
            rel="noreferrer"
            href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields"
          >
            Next.js Metadata docs
          </a>
          .
        </div>
      </div>
    </>
  )
}
