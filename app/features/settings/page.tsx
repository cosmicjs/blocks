/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  const cosmic = cosmicSourceBucketConfig
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("title")
    .depth(1)
  return {
    title: `${settings.title}`,
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1)

  type Link = {
    url: string
    company: string
    icon: {
      imgix_url: string
    }
  }
  function Preview() {
    return (
      <div className="w-full">
        <div className="my-10 h-[60px]">
          <a href="/">
            <img
              src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
              alt={settings.metadata.company}
              className="m-auto h-full"
            />
          </a>
        </div>
        <div className="mb-8 flex justify-center gap-x-8">
          {settings.metadata.links.map((link: Link) => {
            return (
              <a
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="h-[26px]"
                  src={`${link.icon.imgix_url}?w=500&auto=format,compression`}
                  alt={link.company}
                />
              </a>
            )
          })}
        </div>
        <div className="flex justify-center gap-x-8">
          <div>
            <a href={`mailto:${settings.metadata.email}`}>Email us</a>
          </div>
          <div>
            <a href={`tel:${settings.metadata.phone}`}>Call us</a>
          </div>
        </div>
      </div>
    )
  }
  function Code() {
    const codeString = dedent`
      \`\`\`jsx
      // components/footer.tsx
      import { cosmic } from "@/lib/cosmic";
      
      export default async function GlobalSettings() {
        
        const { object: settings } = await cosmic.objects
          .findOne({
            type: "global-settings",
            slug: "settings",
          })
          .props("metadata")
          .depth(1)

        type Link = {
          url: string
          company: string
          icon: {
            imgix_url: string
          }
        }
        
        return (
          <div className="w-full">
            <div className="my-10 h-[60px]">
              <a href="/">
                <img
                  src={\`\${settings.metadata.logo.imgix_url}?w=500&auto=format,compression\`}
                  alt={settings.metadata.company}
                  className="h-full m-auto"
                />
              </a>
            </div>
            <div className="mb-8 flex gap-x-8 justify-center">
              {settings.metadata.links.map((link: Link) => {
                return (
                  <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
                    <img
                      className="h-[26px]"
                      src={\`\${link.icon.imgix_url}?w=500&auto=format,compression\`}
                      alt={link.company}
                    />
                  </a>
                );
              })}
            </div>
            <div className="flex gap-x-8 justify-center">
              <div>
                <a href={\`mailto:\${settings.metadata.email}\`}>Email us</a>
              </div>
              <div>
                <a href={\`tel:\${settings.metadata.phone}\`}>Call us</a>
              </div>
            </div>
          </div>
        );
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK.
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 1. Install a new Next.js project
          </h3>
          <div className="py-2">
            Note: Be sure to include TypeScript and Tailwind CSS in the
            installation options.
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
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add react-markdown
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
            Step 4. Add the following to any file that needs global settings
            data, for example `components/footer.tsx`
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 and any page where this global
            settings data has been added. It should look like this:
          </h3>
        </div>
        <div className="mb-6">
          <Preview />
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
