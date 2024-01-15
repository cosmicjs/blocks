import { cosmic } from "@/cosmic/client"
import { Testimonial, TestimonialType } from "./Testimonial"

export async function Testimonials({
  query,
  sort,
  limit,
  skip,
  className,
  preview,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
  preview?: boolean
}) {
  const { objects: testimonials } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(preview ? "any" : "published")
  return (
    <div className={className}>
      {testimonials?.map((testimonial: TestimonialType) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />
      })}
    </div>
  )
}
