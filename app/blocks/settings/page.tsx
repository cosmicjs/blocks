/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

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
      <section className="container pb-8">
        {tab === "preview" ? (
          <Preview />
        ) : (
          <div className="m-auto grid max-w-[800px] items-center ">
            <Code />
          </div>
        )}
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
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <div className="my-6 h-[60px]">
        <a href="/">
          <img
            src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="m-auto h-14 dark:hidden"
          />
          <img
            src={`${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="m-auto hidden h-14 dark:block"
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
  // components/Header.tsx
  import Link from "next/link";
  import { cosmic } from "@/cosmic/client";
  import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";

  export async function Header() {
    // Header data
    const { object: settings } = await cosmic.objects
      .findOne({
        type: "global-settings",
        slug: "settings",
      })
      .props("metadata")
      .depth(1);

    return (
      <div className="space-x-4 sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg py-2 w-full z-[9999]">
        <div className="m-auto flex items-center md:container justify-between pl-2 pr-4">
          <Link href="/">
            <img
              src={\`\${settings.metadata.logo.imgix_url}?w=500&auto=format,compression\`}
              alt={settings.metadata.company}
              className="h-10 m-auto dark:hidden"
            />
            <img
              src={\`\${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression\`}
              alt={settings.metadata.company}
              className="h-10 m-auto hidden dark:block"
            />
          </Link>
          <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
        </div>
      </div>
    );
  }
  \`\`\`
  `
  const codeFooterString = dedent`
  \`\`\`jsx
  // components/Footer.tsx
  import Link from "next/link";
  import { cosmic } from "@/cosmic/client";
  import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
  type LinkType = {
    url: string;
    company: string;
    icon: {
      imgix_url: string;
    };
  };

  export async function Footer() {
    const { object: settings } = await cosmic.objects
      .findOne({
        type: "global-settings",
        slug: "settings",
      })
      .props("metadata")
      .depth(1);

    return (
      <div className="my-10">
        <div className="my-8 text-center">
          <NavMenu query={{ type: "navigation-menus", slug: "footer" }} />
        </div>
        <div className="mb-8 flex gap-x-8 justify-center">
          {settings.metadata.links.map((link: LinkType) => {
            return (
              <Link href={link.url} key={link.url} target="_blank" rel="noreferrer">
                <img
                  className="h-[26px]"
                  src={\`\${link.icon.imgix_url}?w=500&auto=format,compression\`}
                  alt={link.company}
                />
              </Link>
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

  const codeLayoutString = dedent`
  \`\`\`jsx
  // app/layout.tsx
  import "./globals.css";
  import { Header } from "@/components/Header";
  import { Footer } from "@/components/Footer";
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    );
  }    
  \`\`\`
  `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `global-settings` singleton Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Usage: Header",
      description: (
        <>
          The Global Settings data is meant to be used in multiple locations.
          For example, add the following to a file located at
          `components/Header.tsx` file. Note: this assumes you have installed
          the{" "}
          <Link href="/blocks/nav-menus" className="text-cosmic-blue">
            Nav Menu Block
          </Link>
          .
        </>
      ),
      code: codeHeaderString,
    },
    {
      title: "Usage: Footer",
      description: (
        <>
          Add the following to a file located at `components/Footer.tsx`. Note:
          this assumes you have installed the{" "}
          <Link href="/blocks/nav-menus" className="text-cosmic-blue">
            Navigation Menu Block
          </Link>
          .
        </>
      ),
      code: codeFooterString,
    },
    {
      title: "Usage: Layout",
      description: "Then include the components in your `layout.tsx` file.",
      code: codeLayoutString,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="settings" />
    </>
  )
}
