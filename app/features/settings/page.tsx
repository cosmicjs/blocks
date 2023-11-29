/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import CodeSteps from "@/components/layouts/CodeSteps"

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

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

type Link = {
  url: string
  company: string
  icon: {
    imgix_url: string
  }
}

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { object: settings } = await cosmic.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1)

  return (
    <div className="m-auto mt-10 w-full md:min-w-[1000px]">
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
            <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
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
  const codeHeaderString = dedent`
    \`\`\`jsx
    // components/header.tsx
    import Link from "next/link";
    import { cosmic } from "@/lib/cosmic";
    import { NavMenu } from "@/components/nav-menu";

    export default async function Header() {
      // Header data
      const { object: header } = await cosmic.objects
        .findOne({
          type: "navigation-menus",
          slug: "header",
        })
        .props("metadata")
        .depth(1);
      
      const { object: settings } = await cosmic.objects
        .findOne({
          type: "global-settings",
          slug: "settings",
        })
        .props("metadata")
        .depth(1);

      return (
        <div className="my-4 flex items-center justify-between container space-x-4">
          <Link href="/">
            <img
              src={\`\${settings.metadata.logo.imgix_url}?w=500&auto=format,compression\`}
              alt={settings.metadata.company}
              className="h-20 m-auto"
            />
          </Link>
          <NavMenu items={header.metadata.items} />
        </div>
      );
    }
    \`\`\`
    `
  const codeFooterString = dedent`
    \`\`\`jsx
    // components/footer.tsx
    import { cosmic } from "@/lib/cosmic";
    import { NavMenu } from "@/components/nav-menu";

    export default async function Footer() {
      // Footer data
      const { object: footer } = await cosmic.objects
        .findOne({
          type: "navigation-menus",
          slug: "footer",
        })
        .props("metadata")
        .depth(1);

      const { object: settings } = await cosmic.objects
        .findOne({
          type: "global-settings",
          slug: "settings",
        })
        .props("metadata")
        .depth(1);

      type Link = {
        url: string;
        company: string;
        icon: {
          imgix_url: string;
        };
      };

      return (
        <div className="my-10">
          <div className="my-8">
            <NavMenu items={footer.metadata.items} />
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

  const steps = [
    {
      title:
        "The Global Settings data is meant to be used in multiple locations. For example, add the following to the `components/header.tsx` file ",
      description: (
        <>
          Note: this assumes you have installed the{" "}
          <Link href="/features/nav-menus" className="text-cosmic-blue">
            Nav Menu feature template
          </Link>
        </>
      ),
      code: codeHeaderString,
    },
    {
      title: "Add the following to the `components/footer.tsx` file",
      description: (
        <>
          Note: this assumes you have installed the{" "}
          <Link href="/features/nav-menus" className="text-cosmic-blue">
            Nav Menu feature template
          </Link>
        </>
      ),
      code: codeFooterString,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} preview={<Preview />} />
    </>
  )
}
