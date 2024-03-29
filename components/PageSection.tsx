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
                    variant: "secondary",
                  })
                )}
                href="#"
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
                    variant: "secondary",
                  })
                )}
                href="#"
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
                    variant: "secondary",
                  })
                )}
                href="#"
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
