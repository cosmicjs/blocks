// app/page.tsx
import { cn } from "@/cosmic/utils"
import { buttonVariants } from "./button"
import { Section } from "./PageSection"
import { cosmic } from "@/cosmic/client"

export async function Page({ query }: { query: any }) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("slug,title,metadata")
    .depth(1)

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
