/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { NavMenu } from "@/components/NavMenu"
import CodeSteps from "@/components/layouts/CodeSteps"

export async function generateMetadata() {
  return {
    title: `Navigation Menu`,
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
  return (
    <div className="m-auto mt-10">
      <div className="my-10">
        <h2 className="mb-6 text-center text-3xl">Header</h2>
        <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
      </div>
      <div className="my-10">
        <h2 className="mb-6 text-center text-3xl">Footer</h2>
        <NavMenu query={{ type: "navigation-menus", slug: "footer" }} />
      </div>
    </div>
  )
}

function Code() {
  const codeString = dedent`
    \`\`\`jsx
      // app/layout.tsx
      import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
      import './globals.css'
      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en">
            <body>
              <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
              {children}
              <NavMenu query={{ type: "navigation-menus", slug: "footer" }} />
            </body>
          </html>
        );
      }
    \`\`\`
    `
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add navigation-menu
  \`\`\`
  `

  const importCode = dedent`
  \`\`\`jsx
  import { NavMenu } from "@/cosmic/blocks/navigation-menu/NavMenu";
  \`\`\`
  `

  const usageCode = dedent`
    \`\`\`jsx
    <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `navigation-menus` Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `NavMenu.tsx` and `MobileNav.tsx` to your blocks folder located in `cosmic/blocks/navigation-menu`.",
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
      title: "Add the NavMenu block to any file that needs navigation links.",
      description:
        "For example, adding it to the `app/layout.tsx` file will make sure all pages include the header and footer links.",
      code: codeString,
    },
  ]

  return (
    <>
      <CodeSteps
        steps={steps}
        preview={<Preview />}
        featureKey="navigation_menus"
      />
    </>
  )
}
