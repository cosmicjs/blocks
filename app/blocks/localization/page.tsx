/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import classNames from "classnames"
import dedent from "dedent"

import { CodeSteps } from "@/components/layouts/CodeSteps"
import { LocaleSelect } from "@/components/localization/LocaleSelect"

export async function generateMetadata() {
  return {
    title: `Localization`,
  }
}

export default async function ProductsPage({
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
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative mb-20 flex w-full max-w-[950px] flex-col items-start">
          <h1 className="mb-4 w-full text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Locale select
          </h1>
          <p className="mb-8 w-full text-center">
            Use the locale select block to switch content between different
            localized versions.
          </p>
          <LocaleSelect
            defaultLocale={"en"}
            objectType={"localization"}
            className="m-auto"
          />
        </div>
      </section>
    </div>
  )
}

function Code() {
  const localizationCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add localization
    \`\`\`
    `
  const localizationImportCode = dedent`
    \`\`\`jsx
    import { LocaleSelect } from "@/cosmic/blocks/localization/LocaleSelect";
    \`\`\`
    `

  const localizationUsageCode = dedent`
    \`\`\`jsx
    <LocaleSelect
      defaultLocale={"en"}
      linkPath={\`/[locale]/blog/your-object-slug\`}
      objectType={"blog-posts"}
    />
    \`\`\`
    `
  const localizationExampleCode = dedent`
    \`\`\`jsx
    // app/[locale]/blog/[slug]/page.tsx
    import { SingleBlog } from "@/cosmic/blocks/blog/SingleBlog";
    import { LocaleSelect } from "@/cosmic/blocks/localization/LocaleSelect";

    export default async function SingleBlogPage({
      params,
    }: {
      params: { slug: string; locale: string };
    }) {
      return (
        <div className="m-auto max-w-[700px]">
          <LocaleSelect
            defaultLocale={params.locale}
            linkPath={\`/[locale]/blog/\${params.slug}\`}
            objectType={"blog-posts"}
            className="my-10 ml-4"
          />
          <SingleBlog
            query={{ slug: params.slug, type: "blog-posts", locale: params.locale }}
          />
        </div>
      );
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block code",
      code: localizationCommand,
      description:
        "This will add `LocaleSelect.tsx` file to your blocks folder located in `cosmic/blocks/localization`.",
    },
    {
      title: "Import",
      code: localizationImportCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: localizationUsageCode,
      description:
        "Configure the component to get the locales from any Object type that has localization enabled. Uses the short code `[locale]` in the linkPath to replace with the selected locale.",
    },
    {
      title: "Example",
      code: localizationExampleCode,
      description: (
        <>
          Add the component to any area that needs the ability to switch between
          locales. This example uses the{" "}
          <Link href="/blocks/blog" className="text-cosmic-blue">
            Blog block
          </Link>
          .
        </>
      ),
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="localization" />
    </>
  )
}
