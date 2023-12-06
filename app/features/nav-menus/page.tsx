/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { NavMenu } from "@/components/nav-menu"
import { SiteHeader } from "@/components/site-header"
import CodeSteps from "@/components/layouts/CodeSteps"

export async function generateMetadata() {
  return {
    title: `Navigation Menus`,
  }
}

export default async function NavMenus({
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
  const { object: header } = await cosmic.objects
    .findOne({
      type: "navigation-menus",
      slug: "header",
    })
    .props("metadata")
    .depth(1)

  const { object: footer } = await cosmic.objects
    .findOne({
      type: "navigation-menus",
      slug: "footer",
    })
    .props("metadata")
    .depth(1)

  return (
    <div className="m-auto mt-10">
      <div className="my-10">
        <h2 className="mb-6 text-center text-3xl">Header</h2>
        <NavMenu items={header.metadata.items} />
      </div>
      <div className="my-10">
        <h2 className="mb-6 text-center text-3xl">Footer</h2>
        <NavMenu items={footer.metadata.items} />
      </div>
    </div>
  )
}

function Code() {
  const navCode = dedent`
    \`\`\`jsx
      // components/nav-menu.tsx
      "use client"

      import Link from "next/link"

      import {
        NavigationMenu,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        navigationMenuTriggerStyle,
      } from "@/components/ui/navigation-menu"

      type Item = {
        title: string;
        link: string;
        open_in_new_tab: boolean
      }

      export function NavMenu({ items }: { items: Item[] }) {
        return (
          <NavigationMenu className="m-auto">
            <NavigationMenuList>
              <NavigationMenuItem>
                {items.map((item: Item) => {
                  return (
                    <Link href={item.link} legacyBehavior passHref key={item.title}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        target={item.open_in_new_tab ? "_blank" : ""}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )
                })}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )
      }
    \`\`\`
    `
  const headerCode = dedent`
    \`\`\`jsx
      // components/header.tsx
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

        return <NavMenu items={header.metadata.items} />
      }
    \`\`\`
    `

  const footerCode = dedent`
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

        return <NavMenu items={footer.metadata.items} />
      }
    \`\`\`
    `

  const pageCode = dedent`
    \`\`\`jsx
      // app/layout.tsx
      import type { Metadata } from "next";
      import { Inter } from "next/font/google";
      import "./globals.css";
      import Header from "@/components/header";
      import Footer from "@/components/footer";
      const inter = Inter({ subsets: ["latin"] });

      export const metadata: Metadata = {
        title: "Cosmic Blocks",
        description: "Build content-powered websites and apps faster with Cosmic",
      };

      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en">
            <body className={inter.className}>
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
      title:
        "Add a new file located at `components/nav-menu.tsx` with the following",
      code: navCode,
    },
    {
      title:
        "Create a Header component located in the `components/header.tsx`.",
      code: headerCode,
    },
    {
      title:
        "Create a Footer component located in the `components/footer.tsx`.",
      code: footerCode,
    },
    {
      title: "Replace `app/layout.tsx` with the following",
      code: pageCode,
    },
  ]

  return (
    <>
      <CodeSteps
        title={
          <div className="mb-6">
            The following code example uses Next.js, Tailwind CSS, and the
            Cosmic JavaScript SDK as well as the{" "}
            <a
              href="https://ui.shadcn.com/docs/components/navigation-menu"
              className="text-cosmic-blue"
              target="_blank"
              rel="noreferrer"
            >
              Shadcn UI Navigation Menu
            </a>
            . This is a basic example, but can be extended using nested links.
            Feel free to skip any steps that have already been completed.
          </div>
        }
        step2={[
          "bun add @cosmicjs/sdk",
          "npx shadcn-ui@latest init",
          "npx shadcn-ui@latest add navigation-menu",
        ]}
        steps={steps}
        preview={<Preview />}
      />
    </>
  )
}
