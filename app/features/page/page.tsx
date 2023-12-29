/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchPageData } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Section } from "@/components/page-section"
import CodeSteps from "@/components/layouts/CodeSteps"

export async function generateMetadata() {
  return {
    title: `Page Block`,
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
  const importCode = dedent`
    \`\`\`jsx
      import { Page } from "@/cosmic/blocks/pages/Page";
    \`\`\`
    `
  const usageCode = dedent`
    \`\`\`jsx
      <Page query={{ slug: "home", type: "pages" }} />
    \`\`\`
    `

  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add pages
    \`\`\`
    `
  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will create the `pages` Object type in your Bucket and add demo content.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `Page.tsx` and `PageSection.tsx` to your blocks folder located in `cosmic/blocks/pages`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description:
        "Add the block to your app with the `query` property set to fetch your specific content.",
    },
    {
      title: "Example: Home page",
      description:
        "You can create a home page by creating a new file at `app/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
        // app/page.tsx
        import { Page } from "@/cosmic/blocks/pages/Page";
        
        export default async function HomePage() {
          return <Page query={{ slug: "home", type: "pages" }} />;
        }
      \`\`\`
      `),
    },
  ]

  const dynamicPagesSteps = [
    {
      title: "Example: Dynamic pages",
      description:
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
      title: "Create dynamic pages in Cosmic",
      description:
        "Go to Bucket > Objects > Pages and add new pages. For example create a new Page with title`Features` and slug `features` and see it available at `https://localhost:3000/features`",
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
