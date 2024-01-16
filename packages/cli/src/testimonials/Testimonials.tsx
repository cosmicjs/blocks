import { cosmic } from "@/cosmic/client"
import { Testimonial, TestimonialType } from "./Testimonial"

export async function Testimonials({
  query,
  sort,
  limit,
  skip,
  className,
  status,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
  status?: "draft" | "published" | "any"
}) {
  const { objects: testimonials } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  return (
    <div className={className}>
      {testimonials?.map((testimonial: TestimonialType) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />
      })}
    </div>
  )
}
