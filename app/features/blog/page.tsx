import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import helpers from "@/lib/helpers"
import { Markdown } from "@/components/elements/Markdown/Markdown"

export async function generateMetadata() {
  const cosmic = cosmicSourceBucketConfig
  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
    })
    .props("slug,title,metadata")
    .depth(1)
  return {
    title: `${blog.title}`,
  }
}

export default async function BlogPage() {
  const cosmic = cosmicSourceBucketConfig

  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
    })
    .props("slug,title,metadata")
    .depth(1)

  return (
    <>
      <div className="py-6">TABS: Preview / Code</div>
      <img
        src={`${blog.metadata.image.imgix_url}?w=1000&auto=format,compression`}
        alt={blog.title}
      />
      <section className="container grid items-center gap-6 p-4 pb-8 pt-6 md:py-10 lg:w-[980px]">
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {blog.title}
          </h1>
          <div className="flex">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div>
              Published by {blog.metadata.author.title}
              <br />
              {helpers.stringToFriendlyDate(blog.metadata.published_date)}
            </div>
            <div className="absolute right-0">
              {blog.metadata.categories.map((cat: any) => {
                return (
                  <span
                    className="mb-1 mr-1 rounded-xl px-3 py-1 text-white"
                    style={{
                      backgroundColor: cat.metadata.color,
                    }}
                  >
                    {cat.title}
                  </span>
                )
              })}
            </div>
          </div>
          <Markdown>{blog.metadata.content}</Markdown>
        </div>
      </section>
    </>
  )
}
