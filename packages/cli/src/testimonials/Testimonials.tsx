import { cosmic } from "@/cosmic/client"
import { Testimonial, TestimonialType } from "./Testimonial"

export async function Testimonials({
  query,
  sort,
  limit,
  skip,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
}) {
  const { objects: testimonials } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort)
    .limit(limit)
    .skip(skip)
  return testimonials?.map((testimonial: TestimonialType) => {
    return <Testimonial testimonial={testimonial} key={testimonial.slug} />
  })
}
