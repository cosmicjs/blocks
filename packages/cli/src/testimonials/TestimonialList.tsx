import { cosmic } from "@/cosmic/client"
import { Testimonial, TestimonialType } from "./Testimonial"

function Testimonials({ testimonials }: { testimonials: TestimonialType[] }) {
  return (
    <>
      {testimonials?.map((testimonial: TestimonialType) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />
      })}
    </>
  )
}

export async function TestimonialList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
  noWrap = false,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
  status?: "draft" | "published" | "any"
  noWrap?: boolean
}) {
  const { objects: testimonials } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  if (noWrap) return <Testimonials testimonials={testimonials} />
  return (
    <div className={`m-auto max-w-[800px] p-4 ${className}`}>
      <Testimonials testimonials={testimonials} />
    </div>
  )
}
