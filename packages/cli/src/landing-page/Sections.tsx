// cosmic/blocks/landing-page/Sections.tsx
import { Section } from "@/cosmic/blocks/landing-page/Section"
import { cosmic } from "@/cosmic/client"
import { notFound } from "next/navigation"

export async function Sections({
  query,
  className,
  status,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  try {
    const { object: page } = await cosmic.objects
      .findOne(query)
      .props("slug,title,metadata")
      .depth(1)
      .status(status ? status : "published")

    return (
      <section
        className={`grid items-center bg-zinc-50 p-4 py-10 dark:bg-zinc-900 ${className}`}
      >
        <div className="relative m-auto flex max-w-6xl flex-col items-start gap-2">
          <h2 className="font-display m-auto max-w-[800px] pt-8 text-center text-3xl text-zinc-900 dark:text-zinc-100 md:text-6xl">
            {page.metadata.section_title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            className="m-auto mb-16 max-w-[800px] text-center text-zinc-700 dark:text-zinc-300"
          />
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return <Section key={section.heading} section={section} />
            })}
          </div>
        </div>
      </section>
    )
  } catch (e: any) {
    if (e.status === 404) return notFound()
  }
}
