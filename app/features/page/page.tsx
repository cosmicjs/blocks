/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchPageData } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { Section } from "@/components/page-section"
import CodeSteps from "@/components/layouts/CodeSteps"

export async function generateMetadata() {
  const page = await fetchPageData("home")
  return {
    title: `${page.title}`,
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
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  const page = await fetchPageData("home")
  return (
    <div>
      <div className="pb-4 pt-20">
        <h1 className="text-center text-4xl font-bold">{page.metadata.h1}</h1>
      </div>
      <div className="m-auto max-w-3xl pb-8">
        <div className="text-center text-xl">{page.metadata.subheadline}</div>
      </div>
      <div className="m-auto max-w-3xl pb-20">
        <div className="text-center text-xl">
          <a
            className={cn(
              "mr-4",
              buttonVariants({
                variant: "default",
              })
            )}
            href="https://www.cosmicjs.com"
          >
            Get started free
          </a>
          <a
            className={buttonVariants({
              variant: "secondary",
            })}
            href="https://www.cosmicjs.com/contact"
          >
            Contact us
          </a>
        </div>
      </div>
      <div className="m-auto mb-10 w-full max-w-[1100px] px-4">
        <img
          src={`${page.metadata.image.imgix_url}?w=3000&auto=format,compression`}
          alt={page.title}
          className="w-full"
        />
      </div>
      <section className="container grid items-center py-10">
        <div className="relative m-auto flex max-w-3xl flex-col items-start gap-2">
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px]"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section key={section.header} section={section} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

function Code() {
  const codeSectionString = dedent`
    \`\`\`jsx
    // components/page-section.tsx
    import { cn } from "@/lib/utils"
    import { buttonVariants } from "@/components/ui/button"
    
    type SectionType = {
      heading: string
      layout: {
        key: string
        value: string
      }
      image: {
        url: string
        imgix_url: string
      }
      content: string
      cta_link: string
      cta_text: string
    }
    
    export function Section({ section }: { section: SectionType }) {
      return (
        <div key={section.heading}>
          {section.layout.key === "1-column-center" && (
            <div className="m-auto max-w-[800px]">
              <div className="mb-6 text-center">
                <h2 className="mb-4 text-2xl font-semibold">{section.heading}</h2>
                <div
                  className="mb-6"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                <div>
                  <a
                    className={cn(
                      "ml-2",
                      buttonVariants({
                        variant: "default",
                      })
                    )}
                    href={section.cta_link}
                  >
                    {section.cta_text}
                  </a>
                </div>
              </div>
              <div>
                <img
                  alt={section.heading}
                  className="rounded-xl"
                  src={section.image.imgix_url}
                />
              </div>
            </div>
          )}
          {section.layout.key === "2-column-image-content" && (
            <div className="grid gap-2 md:grid-cols-2">
              <div className="mr-4">
                <img
                  alt={section.heading}
                  className="rounded-xl"
                  src={section.image.imgix_url}
                />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">{section.heading}</h2>
                <div
                  className="mb-6"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                <div>
                  <a
                    className={cn(
                      "ml-2",
                      buttonVariants({
                        variant: "default",
                      })
                    )}
                    href={section.cta_link}
                  >
                    {section.cta_text}
                  </a>
                </div>
              </div>
            </div>
          )}
          {section.layout.key === "2-column-content-image" && (
            <div className="grid gap-2 md:grid-cols-2">
              <div className="mr-4">
                <h2 className="mb-4 text-2xl font-semibold">{section.heading}</h2>
                <div
                  className="mb-6"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                <div>
                  <a
                    className={cn(
                      "ml-2",
                      buttonVariants({
                        variant: "default",
                      })
                    )}
                    href={section.cta_link}
                  >
                    {section.cta_text}
                  </a>
                </div>
              </div>
              <div>
                <img
                  alt={section.heading}
                  className="rounded-xl"
                  src={section.image.imgix_url}
                />
              </div>
            </div>
          )}
        </div>
      )
    }
    \`\`\`
    `
  const codeString = dedent`
    \`\`\`jsx
    // app/page.tsx
    import { cn } from "@/lib/utils"
    import { buttonVariants } from "@/components/ui/button"
    import { Section } from "@/components/page-section";
    import { cosmic } from "@/lib/cosmic";

    export default async function HomePage() {
      const { object: page } = await cosmic.objects
      .findOne({
        type: "pages",
        slug: "home",
      })
      .props("slug,title,metadata")
      .depth(1)

      return (
        <div>
          <div className="pt-20 pb-4">
            <h1 className="text-center text-4xl font-bold">{page.metadata.h1}</h1>
          </div>
          <div className="pb-8 max-w-3xl m-auto">
            <div className="text-center text-xl">{page.metadata.subheadline}</div>
          </div>
          <div className="pb-20 max-w-3xl m-auto">
            <div className="text-center text-xl">
              <a
                className={cn(
                  "mr-4",
                  buttonVariants({
                    variant: "default",
                  })
                )}
                href="https://www.cosmicjs.com"
              >
                Get started free
              </a>
              <a
                className={buttonVariants({
                  variant: "secondary",
                })}
                href="https://www.cosmicjs.com/contact"
              >
                Contact us
              </a>
            </div>
          </div>
          <div className="w-full px-4 max-w-[1100px] m-auto mb-10">
            <img
              src={\`\${page.metadata.image.imgix_url}?w=3000&auto=format,compression\`}
              alt={page.title}
              className="w-full"
            />
          </div>
          <section className="container grid items-center py-10">
            <div className="relative m-auto max-w-3xl flex flex-col items-start gap-2">
              <div
                dangerouslySetInnerHTML={{ __html: page.metadata.content }}
                className="m-auto mb-16 max-w-[800px]"
              />
              <div className="grid gap-y-28">
                {page.metadata.sections.map((section: any) => {
                  return <Section key={section.header} section={section} />;
                })}
              </div>
            </div>
          </section>
        </div>
      )
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Create a new file located at `lib/cosmic.ts` with the following",
      description: (
        <div>
          Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
          your Bucket API keys found in <BucketAPILink />.
        </div>
      ),
      code: dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
            });
            \`\`\`
            `),
    },
    {
      title:
        "Create a file located at `components/page-section.tsx` with the following",
      code: codeSectionString,
    },
    {
      title: "Update the file located at `app/page.tsx` with the following",
      code: codeString,
    },
  ]

  const dynamicPagesSteps = [
    {
      title:
        "You can create dynamic pages by creating a new file at `app/[slug]/page.tsx` with the following:",
      code: dedent(`\`\`\`jsx
            import { Section } from "@/components/page-section";
            import { cosmic } from "@/lib/cosmic";
            
            export default async function Page({ params }: { params: { slug: string } }) {
              const { object: page } = await cosmic.objects
                .findOne({
                  type: "pages",
                  slug: params.slug, // Get the content using the page slug
                })
                .props("slug,title,metadata")
                .depth(1);
              return (
                <div>
                  <div className="pt-20 pb-4">
                    <h1 className="text-center text-4xl font-bold">{page.metadata.h1}</h1>
                  </div>
                  <div className="pb-8 max-w-3xl m-auto">
                    <div className="text-center text-xl">{page.metadata.subheadline}</div>
                  </div>
                  <div className="w-full px-4 max-w-[1100px] m-auto mb-10">
                    <img
                      src={\`\${page.metadata.image.imgix_url}?w=3000&auto=format,compression\`}
                      alt={page.title}
                      className="w-full"
                    />
                  </div>
                  <section className="container grid items-center py-10">
                    <div className="relative m-auto max-w-3xl flex flex-col items-start gap-2">
                      <div className="grid gap-y-28">
                        {page.metadata.sections.map((section: any) => {
                          return <Section key={section.header} section={section} />;
                        })}
                      </div>
                    </div>
                  </section>
                </div>
              );
            }            
            \`\`\`
          `),
    },
    {
      title:
        "Then go to Bucket > Objects > Pages and add new pages. For example create a new Page with title `Features` and slug `features` and see it available at `https://localhost:3000/features`",
    },
  ]

  return (
    <div>
      <CodeSteps
        step2={[
          "bun add @cosmicjs/sdk",
          "npx shadcn-ui@latest init",
          "npx shadcn-ui@latest add button",
        ]}
        steps={steps}
        preview={<Preview />}
      />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Dynamic pages</h3>
      </div>
      <CodeSteps scratch steps={dynamicPagesSteps} />
    </div>
  )
}
