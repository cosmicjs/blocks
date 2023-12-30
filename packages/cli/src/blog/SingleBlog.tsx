// app/blog/[slug]/page.tsx
import { cosmic } from "@/cosmic/client"
import Markdown from "react-markdown"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export async function SingleBlog({
  query,
  className,
}: {
  query: any
  className?: string
}) {
  const { object: blog } = await cosmic.objects
    .findOne(query)
    .props("id,slug,title,metadata")
    .depth(1)

  return (
    <div className={className}>
      <div className="mb-10 max-h-[500px] w-full overflow-hidden">
        <img
          src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
          alt={blog.title}
          className="w-full object-cover"
        />
      </div>
      <section className="container m-auto grid items-center pb-8">
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {blog.title}
          </h1>
          <div className="mb-8 flex">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div>
              <span className="font-semibold">
                {blog.metadata.author.title}
              </span>
              <br />
              {new Date(blog.metadata.published_date).toLocaleDateString(
                "en-us",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
            <div className="absolute right-0">
              {blog.metadata.categories.map((cat: any) => {
                return (
                  <span
                    className="mb-1 mr-1 rounded-xl px-3 py-1 text-white"
                    style={{
                      backgroundColor: cat.metadata.color,
                    }}
                    key={cat.slug}
                  >
                    {cat.title}
                  </span>
                )
              })}
            </div>
          </div>
          <Markdown>{blog.metadata.content}</Markdown>
          <div className="my-10">
            <Link href="/blog" className="flex text-blue-800">
              <ArrowLeftIcon className="mr-2 mt-1 h-4 w-4" /> Back to blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
