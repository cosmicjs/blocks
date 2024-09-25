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
      .props("id,slug,title,metadata")
      .depth(1)
      .status(status ? status : "published")

    return (
      <section
        className={`grid items-center bg-zinc-50 p-4 py-10 dark:bg-zinc-900 ${className}`}
      >
        <div className="relative m-auto flex max-w-6xl flex-col items-start gap-2">
          <h2
            data-cosmic-object={page.id}
            className="font-display m-auto mb-10 mt-8 max-w-[800px] text-center text-2xl text-zinc-900 dark:text-zinc-100 md:text-6xl"
          >
            {page.metadata?.sections_area_title}
          </h2>
          <div className="grid gap-y-28">
            {page.metadata.sections.map((section: any) => {
              return (
                <Section
                  key={section.heading}
                  section={section}
                  objectId={page.id}
                />
              )
            })}
          </div>
        </div>
      </section>
    )
  } catch (e: any) {
    if (e.status === 404) return notFound()
  }
}
