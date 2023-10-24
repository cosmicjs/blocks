/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  const { object: seo } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "seo-fields",
      slug: "seo",
    })
    .props("metadata")
    .depth(1)
  return {
    title: seo.metadata.seo.title,
    description: seo.metadata.seo.description,
    openGraph: {
      title: seo.metadata.seo.og_title,
      description: seo.metadata.seo.og_description,
      images: [seo.metadata.seo.og_image.imgix_url],
    },
  }
}

export default async function SEO({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { object: seo } = await cosmic.objects
    .findOne({
      type: "seo-fields",
      slug: "seo",
    })
    .props("metadata")
    .depth(1)
  function Preview() {
    return (
      <div className="m-auto mt-10 w-full">
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
      // app/blog/[slug]/page.tsx
      import { cosmic } from "@/lib/cosmic";

      export async function generateMetadata({ params }: { params: { slug: string } }) {
        const { object: blog } = await cosmic.objects
          .findOne({
            type: "blog-posts", // Change to your Object type
            slug: params.slug, // Change to your Object slug
          })
          .props("metadata")
          .depth(1)
        return {
          title: blog.metadata.seo.title,
          description: blog.metadata.seo.description,
          openGraph: {
            title: blog.metadata.seo.og_title,
            description: blog.metadata.seo.og_description,
            images: [blog.metadata.seo.og_image.imgix_url],
          }
        }
      }
      
      export default async function BlogPage({ params }: { params: { slug: string } }) {
        
        const { object: blog } = await cosmic.objects
          .findOne({
            type: "blog-posts",
            slug: params.slug,
          })
          .props("slug,title,metadata")
          .depth(1);
        
        return (
          <>
            { /* Blog post content here. See Blog feature template. */ }
          </>
        );
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js and the Cosmic JavaScript SDK.
          Feel free to ignore any steps that have already been completed.
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 1. Install a new Next.js project
          </h3>
          <div className="py-2">
            Note: Be sure to include TypeScript in the installation options.
          </div>
          <Markdown>
            {dedent(`\`\`\`bash
            bunx create-next-app@latest cosmic-app
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Create a new file located at `lib/cosmic.ts` with the
            following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
          <Markdown>
            {dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
            });
            \`\`\`
            `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Add the following to any file that needs SEO
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 5. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 and any page where the SEO
            fields have been added and you should see the following in the
            source code.
          </h3>
        </div>
        <div className="mb-6">
          <Preview />
        </div>
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
      </div>
    )
  }
  return (
    <>
      <SiteHeader tab={tab} />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
