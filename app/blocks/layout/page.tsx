/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

export async function generateMetadata() {
  return {
    title: `Layout`,
  }
}

export default async function Layout({
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

async function Preview() {
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <Header />
      <div className="my-8 flex h-[400px] items-center justify-center border border-dashed text-center">
        PAGE CONTENT HERE
      </div>
      <Footer />
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
      .props("id,metadata")
      .depth(1);

    return (
      <div className="space-x-4 sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg py-2 w-full z-[9999]">
        <div
          className="w-[280px] z-0 h-12 left-2 absolute top-2"
          data-cosmic-object={settings.id}
        ></div>
        <div className="m-auto flex items-center md:container justify-between pl-2 pr-4">
          <Link href="/" className="relative z-10">
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
    // Footer data
    const { object: settings } = await cosmic.objects
      .findOne({
        type: "global-settings",
        slug: "settings",
      })
      .props("id,metadata")
      .depth(1);

    return (
      <div className="my-10">
        <div className="my-8 text-center">
          <NavMenu
            query={{ type: "navigation-menus", slug: "footer" }}
            hasMobileMenu={false}
          />
        </div>
        <div data-cosmic-object={settings.id}>
          <div className="mb-8 flex gap-x-8 justify-center">
            {settings.metadata.links.map((link: LinkType) => {
              return (
                <Link
                  href={link.url}
                  key={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
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
      </div>
    );
  }
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
        <body className="dark:bg-black bg-white">
          <Header />
          {children}
          <Footer />
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

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `navigation-menus` and `global-settings` Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `NavMenu.tsx` and `MobileNav.tsx` to your blocks folder located in `cosmic/blocks/navigation-menu`.",
    },
    {
      title: "Usage: Header",
      description:
        "Add a `components/Header.tsx` file to your code with the following:",
      code: codeHeaderString,
    },
    {
      title: "Usage: Footer",
      description:
        "Add a `components/Footer.tsx` file to your code with the following:",
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
      <CodeSteps steps={steps} featureKey="layout" />
    </>
  )
}
