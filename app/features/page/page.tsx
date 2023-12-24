/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchPageData } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { Section } from "@/components/page-section"
import CodeSteps from "@/components/layouts/CodeSteps"

export async function generateMetadata() {
  const page = await fetchPageData("home")
  return {
    title: `${page.title}`,
  }
}

export default async function Page({
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
  const page = await fetchPageData("home")
  return (
    <div>
      <div className="pb-4 pt-20">
        <h1 className="text-center text-4xl font-bold">{page.metadata.h1}</h1>
      </div>
      <div className="m-auto max-w-3xl pb-8">
        <div className="text-center text-xl">{page.metadata.subheadline}</div>
      </div>
      <div className="m-auto max-w-3xl pb-20">
        <div className="text-center text-xl">
          <a
            className={cn(
              "mr-4",
              buttonVariants({
                variant: "default",
              })
            )}
            href="https://www.cosmicjs.com"
          >
            Get started free
          </a>
          <a
            className={buttonVariants({
              variant: "secondary",
            })}
            href="https://www.cosmicjs.com/contact"
          >
            Contact us
          </a>
        </div>
      </div>
      <div className="m-auto mb-10 w-full max-w-[1100px] px-4">
        <img
          src={`${page.metadata.image.imgix_url}?w=3000&auto=format,compression`}
          alt={page.title}
          className="w-full"
        />
      </div>
      <section className="container grid items-center py-10">
        <div className="relative m-auto flex max-w-3xl flex-col items-start gap-2">
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px]"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section key={section.header} section={section} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

function Code() {
  const codeString = dedent`
    \`\`\`jsx
      // app/page.tsx
      import { Page } from "@/cosmic/blocks/pages/Page";
      
      export default async function HomePage() {
        return <Page query={{ slug: "home", type: "pages" }} />
      }
    \`\`\`
    `

  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add pages
    \`\`\`
    `

  const envVarsCode = dedent`
    \`\`\`
      # .env.local
      COSMIC_BUCKET_SLUG=change_to_your_bucket_slug
      COSMIC_READ_KEY=change_to_your_bucket_read_key
      COSMIC_WRITE_KEY=change_to_your_bucket_write_key
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      code: blockCommand,
      description:
        "This will create the `pages` Object type in your Bucket and add demo content.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `Page.tsx`,`PageSection.tsx`, and `button.tsx` to your blocks folder located in `cosmic/blocks/pages`.",
    },
    {
      title: "Add the code to your app",
      code: codeString,
      description: "Add the following code to `app/page.tsx`.",
    },
  ]

  const dynamicPagesSteps = [
    {
      title:
        "You can create dynamic pages by creating a new file at `app/[slug]/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
        // app/[slug]/page.tsx
        import { Page } from "@/cosmic/blocks/pages/Page";
        
        export default async function DynamicPage({
          params,
        }: {
          params: { slug: string };
        }) {
          return <Page query={{ slug: params.slug, type: "pages" }} />;
        }
      \`\`\`
      `),
    },
    {
      title:
        "Then go to Bucket > Objects > Pages and add new pages. For example create a new Page with title `Features` and slug `features` and see it available at `https://localhost:3000/features`",
    },
  ]

  return (
    <div>
      <CodeSteps steps={steps} preview={<Preview />} featureKey="pages" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Dynamic pages</h3>
      </div>
      <CodeSteps scratch steps={dynamicPagesSteps} featureKey="pages" />
    </div>
  )
}
