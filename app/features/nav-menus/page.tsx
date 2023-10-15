/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { NavMenu } from "@/components/nav-menu"
import { SiteHeader } from "@/components/site-header"

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

  function Preview() {
    return (
      <>
        <div className="my-10">
          <h2 className="mb-6 text-3xl text-center">Header</h2>
          <NavMenu items={header.metadata.items} />
        </div>
        <div className="my-10">
          <h2 className="mb-6 text-3xl text-center">Footer</h2>
          <NavMenu items={footer.metadata.items} />
        </div>
      </>
    )
  }
  function Code() {
    const navCode = dedent`
      \`\`\`jsx
      "use client"

      import Link from "next/link"

      import {
        NavigationMenu,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        navigationMenuTriggerStyle,
      } from "@/components/ui/navigation-menu"

      type Item = { title: string; link: string; open_in_new_tab: boolean }

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
                        target={item.open_in_new_tab ? "_blank" : "_parent"}
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
      import { cosmic } from "@/lib/cosmic";

      import Header from "@/components/header";
      import Footer from "@/components/footer";

      export default async function IndexPage() {
        return (
          <>
            <Header />
            { /* Main content area */ }
            <Footer />
          </>
        );
      }
      \`\`\`
      `

    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK as well as the{" "}
          <a
            href="https://ui.shadcn.com/docs/components/navigation-menu"
            className="text-cosmic-blue"
            target="_blank"
            rel="noreferrer"
          >
            Shadcn UI Navigation Menu
          </a>
          . This is a basic example, but can be extended using nested links.
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
            npx create-next-app@latest cosmic-app
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK and Shandcn UI Navigation Menu
            packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            yarn add @cosmicjs/sdk
            npx shadcn-ui@latest init
            npx shadcn-ui@latest add navigation-menu
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
            Step 4. Add a new file located at `app/components/nav-menu.tsx` with
            the following
          </h3>
          <Markdown>{navCode}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Create a Header component located in the
            `components/header.tsx`.
          </h3>
          <Markdown>{headerCode}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 6. Create a Footer component located in the
            `components/footer.tsx`.
          </h3>
          <Markdown>{footerCode}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add the `Header` and `Footer` components to the file
            `app/page.tsx`.
          </h3>
          <Markdown>{pageCode}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(
              `\`\`\`bash
            yarn dev
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 to see your nav items. It should
            look like this:
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
