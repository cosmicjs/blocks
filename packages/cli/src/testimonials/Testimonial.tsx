import { cn } from "@/cosmic/utils"

export type TestimonialType = {
  title: string
  slug: string
  metadata: {
    company: string
    position: string
    quote: string
    image: {
      imgix_url: string
    }
  }
}

export function Testimonial({
  testimonial,
  className,
}: {
  testimonial: TestimonialType
  className?: string
}) {
  return (
    <figure
      className={cn(
        "mb-6 overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0",
        className
      )}
    >
      <img
        className="mx-auto h-24 w-24 rounded-full object-cover md:h-auto md:w-48 md:rounded-none"
        src={`${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`}
        alt={testimonial.title}
      />
      <div className="space-y-4 text-center md:p-8 md:text-left">
        <blockquote className="relative">
          <p className="relative z-10 text-lg font-medium">
            &quot;{testimonial.metadata.quote}&quot;
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            {testimonial.title}
          </div>
          <div className="text-slate-700 dark:text-slate-500">
            {testimonial.metadata.position}, {testimonial.metadata.company}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}
