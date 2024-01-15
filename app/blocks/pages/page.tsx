/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchPageData } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Section } from "@/components/PageSection"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

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
      <section className="container m-auto grid max-w-5xl items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  const page = await fetchPageData("home")
  return (
    <div className="m-auto grid w-full items-center px-4 py-8">
      <PreviewCopy />
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse justify-between pb-16 text-zinc-950 dark:text-zinc-50 md:flex-row md:gap-12">
        <div className="flex w-full flex-col items-start justify-start md:w-1/2">
          <div className="py-4 md:pt-20">
            <h1 className="font-display text-6xl tracking-tight">
              {page.metadata.h1}
            </h1>
          </div>
          <div className="m-auto pb-8">
            <div className="text-xl text-zinc-700 dark:text-zinc-300">
              {page.metadata.subheadline}
            </div>
          </div>
          <div className="w-full md:pb-20">
            <div className="flex w-full gap-4 md:w-max">
              <a
                className={cn(
                  "w-full md:w-max",
                  buttonVariants({
                    variant: "default",
                  })
                )}
                href="#"
              >
                Get started free
              </a>
              <a
                className={cn(
                  "w-full md:w-max",
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
                href="#"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
        <div className="my-auto w-full px-4 md:w-1/2">
          <img
            src={`${page.metadata.image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="w-full dark:hidden"
          />
          <img
            src={`${page.metadata.dark_image.imgix_url}?w=1600&auto=format,compression`}
            alt={page.title}
            className="hidden w-full dark:block"
          />
        </div>
      </div>
      <section className="-m-4 grid items-center p-4 py-10">
        <div className="relative m-auto flex max-w-6xl flex-col items-start gap-2">
          <h2 className="font-display m-auto max-w-[800px] pt-8 text-center text-3xl text-zinc-900 dark:text-zinc-100 md:text-6xl">
            {page.metadata.section_title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px] text-center text-zinc-700 dark:text-zinc-300"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section key={section.heading} section={section} />
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
  const draftPreviewCode = dedent`
    \`\`\`jsx
    // app/[slug]/page.tsx
    import { Page } from "@/cosmic/blocks/pages/Page";
    export default async function DynamicPage({
      params,
      searchParams,
    }: {
      params: { slug: string };
      searchParams?: any;
    }) {
      return (
        <Page
          query={{ slug: params.slug, type: "pages" }}
          preview={searchParams.preview}
        />
      );
    }
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
    {
      title: "Example: draft preview",
      description:
        "Enable draft preview by setting the `preview` property on the Block. View the draft preview content by setting the `?preview=true` in the URL.",
      code: draftPreviewCode,
    },
    {
      title: "Draft preview link in the dashboard",
      description:
        "To add the draft preview link in the dashboard, go to Pages Object type > Settings and add your preview link in the dashboard under Additional Settings. For example adding the link `http://localhost:3000/[object_slug]?preview=true` will add a Preview button to each page.",
    },
  ]

  return (
    <div>
      <CodeSteps steps={steps} featureKey="pages" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Dynamic pages</h3>
      </div>
      <CodeSteps scratch steps={dynamicPagesSteps} featureKey="pages" />
    </div>
  )
}
