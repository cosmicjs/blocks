/* eslint-disable @next/next/no-img-element */
import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  const cosmic = cosmicSourceBucketConfig
  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
    })
    .props("slug,title,metadata")
    .depth(1)
  return {
    title: `${blog.title}`,
  }
}

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

function Section({ section }: { section: SectionType }) {
  return (
    <div>
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

export default async function BlogPage() {
  const cosmic = cosmicSourceBucketConfig

  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "home",
    })
    .props("slug,title,metadata")
    .depth(1)

  return (
    <div>
      <SiteHeader page="preview" />
      <div className="py-10">
        <h1 className="text-center text-4xl font-bold">{page.metadata.h1}</h1>
      </div>
      <div className="w-full">
        <img
          src={`${page.metadata.image.imgix_url}?w=1000&auto=format,compression`}
          alt={page.title}
          className="w-full"
        />
      </div>
      <section className="container grid items-center p-4 pb-8 pt-6 md:py-10">
        <div className="relative m-auto flex flex-col items-start gap-2">
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px]"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section section={section} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
