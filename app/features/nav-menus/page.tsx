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
    .props("slug,title,metadata")
    .depth(1)

  const { object: footer } = await cosmic.objects
    .findOne({
      type: "navigation-menus",
      slug: "footer",
    })
    .props("slug,title,metadata")
    .depth(1)

  function Preview() {
    return (
      <>
        <div className="my-10">
          <h2 className="mb-6 text-3xl">Header</h2>
          <NavMenu items={header.metadata.links} />
        </div>
        <div className="my-10">
          <h2 className="mb-6 text-3xl">Footer</h2>
          <NavMenu items={footer.metadata.links} />
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

      export function NavigationMenuPreview({ items }: { items: Item[] }) {
        return (
          <NavigationMenu>
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

    const pageCode = dedent`
      \`\`\`jsx
      import { createBucketClient } from "@cosmicjs/sdk";
      
      const cosmic = createBucketClient({
        bucketSlug: "BUCKET_SLUG",
        readKey: "BUCKET_READ_KEY",
      });

      import { NavMenu } from "@/components/nav-menu";

      export default async function IndexPage() {
        // Header data
        const { object: header } = await cosmic.objects
          .findOne({
            type: "navigation-menus",
            slug: "header",
          })
          .props("slug,title,metadata")
          .depth(1);

        // Footer data
        const { object: footer } = await cosmic.objects
          .findOne({
            type: "navigation-menus",
            slug: "footer",
          })
          .props("slug,title,metadata")
          .depth(1);
        return (
          <>
            <div className="my-10">
              <h2 className="mb-6 text-3xl">Header</h2>
              <NavMenu items={header.metadata.links} />
            </div>
            <div className="my-10">
              <h2 className="mb-6 text-3xl">Footer</h2>
              <NavMenu items={footer.metadata.links} />
            </div>
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
            {dedent(
              `\`\`\`bash
            npx create-next-app@latest cosmic-app
            cd cosmic-app
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK and Shandcn UI Navigation Menu
            packages.
          </h3>
          <Markdown>
            {dedent(
              `\`\`\`bash
              yarn add @cosmicjs/sdk
              npx shadcn-ui@latest init
              npx shadcn-ui@latest add navigation-menu
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Add a new file located at `app/components/nav-menu.tsx` with
            the following
          </h3>
          <Markdown>{navCode}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Update `app/page.tsx` with the following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
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
