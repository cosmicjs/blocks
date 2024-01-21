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
    title: `Landing Page`,
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
          <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Hero
          </h1>
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
                {page.metadata?.cta_button_primary?.text}
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
                {page.metadata?.cta_button_secondary?.text}
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
      <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Sections
      </h1>
      <section className="-m-4 grid items-center p-4 py-10">
        <div className="relative m-auto flex max-w-6xl flex-col items-start gap-2">
          <h2 className="font-display m-auto mb-10 max-w-[800px] pt-8 text-center text-2xl text-zinc-900 dark:text-zinc-100 md:text-6xl">
            {page.metadata?.sections_area_title}
          </h2>
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
    import { Hero } from "@/cosmic/blocks/landing-page/Hero";
    \`\`\`
    `
  const usageCode = dedent`
    \`\`\`jsx
    <Hero query={{ slug: "home", type: "pages" }} />
    \`\`\`
    `

  const usageCodeSections = dedent`
    \`\`\`jsx
    <Sections query={{ slug: "home", type: "pages" }} />
    \`\`\`
    `

  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add landing-page
    \`\`\`
    `
  const draftPreviewCode = dedent`
    \`\`\`jsx
    // app/[slug]/page.tsx
    import { Hero } from "@/cosmic/blocks/landing-page/Hero";
    import { Sections } from "@/cosmic/blocks/landing-page/Sections";
    export default async function DynamicPage({
      params,
      searchParams,
    }: {
      params: { slug: string };
      searchParams?: any;
    }) {
      return (
        <>
          <Hero query={{ slug: params.slug, type: "pages" }} status={searchParams.status} />
          <Sections query={{ slug: params.slug, type: "pages" }} status={searchParams.status} />
        </>
      );
    }
    \`\`\`
    `
  const localizationCode = dedent`
    \`\`\`jsx
    // app/[...slug]/page.tsx
    import { Hero } from "@/cosmic/blocks/landing-page/Hero";
    import { Sections } from "@/cosmic/blocks/landing-page/Sections";
    export default async function DynamicPage({
      params,
    }: {
      params: { slug: string[] };
    }) {
      return (
        <>
          <Hero query={{ locale: params.slug[0], slug: params.slug[1], type: "pages" }} />
          <Sections query={{ locale: params.slug[0], slug: params.slug[1], type: "pages" }} />
        </>
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
        "This will add the files `Hero.tsx`, `Sections.tsx`, and `Section.tsx` to your blocks folder located in `cosmic/blocks/landing-page`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage: Hero",
      code: usageCode,
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
      title: "Usage: Sections",
      code: usageCodeSections,
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

  const examples = [
    {
      title: "Hero",
      description:
        "You can add a hero to your home page by updating the file at `app/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
      // app/page.tsx
      import { Hero } from "@/cosmic/blocks/landing-page/Hero";
      export default async function HomePage() {
        return <Hero query={{ slug: "home", type: "pages" }} />;
      }
      \`\`\`
      `),
    },
    {
      title: "Sections",
      description:
        "You can add repeating sections to your home page by updating the file at `app/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
      // app/page.tsx
      import { Hero } from "@/cosmic/blocks/landing-page/Hero";
      import { Sections } from "@/cosmic/blocks/landing-page/Sections";
      export default async function HomePage() {
        return (
          <>
            <Hero query={{ slug: "home", type: "pages" }} />
            <Sections query={{ slug: "home", type: "pages" }} />
          </>
        );
      }
      \`\`\`
      `),
    },
    {
      title: "Dynamic pages",
      description:
        "You can create dynamic pages by creating a new file at `app/[slug]/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
      // app/[slug]/page.tsx
      import { Hero } from "@/cosmic/blocks/landing-page/Hero";
      import { Sections } from "@/cosmic/blocks/landing-page/Sections";
      export default async function DynamicPage({
        params,
      }: {
        params: { slug: string };
      }) {
        return (
          <>
            <Hero query={{ slug: params.slug, type: "pages" }} />
            <Sections query={{ slug: params.slug, type: "pages" }} />
          </>
        );
      }
      \`\`\`
      `),
    },
    {
      title: "Create dynamic pages in Cosmic",
      description:
        "Go to Bucket > Objects > Pages and add new pages. For example create a new Page with title `Features` and slug `features` and see it available at `https://localhost:3000/features`",
    },
    {
      title: "Draft preview",
      description:
        "Enable draft preview by setting the `status` property on the Block. View the draft preview content by setting the `?status=any` in the URL. Note: This is a basic example. It is advisable to consider a security strategy if you intend to keep your preview private.",
      code: draftPreviewCode,
    },
    {
      title: "Draft preview link in the dashboard",
      description:
        "To add the draft preview link in the dashboard, go to Pages Object type > Settings and add your preview link in the dashboard under Additional Settings. For example adding the link `http://localhost:3000/[object_slug]?status=any` will add a Preview button to each page.",
    },
    {
      title: "Localization",
      code: localizationCode,
      description:
        "First, enable localization in the dashboard by going to Page Object type > Settings under Additional Settings. Then set the locale on your specific Object. Finally, pass the `locale` parameter into the query to fetch your localized content. Create a new file at `app/[...slug]/page.tsx` with the following. Then go to any page with localization set, for example: `https://localhost:3000/es/features` or `https://localhost:3000/en/features`.",
    },
  ]

  return (
    <div>
      <CodeSteps steps={steps} featureKey="landing-page" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Examples</h3>
      </div>
      <CodeSteps scratch steps={examples} featureKey="landing-page" />
    </div>
  )
}
