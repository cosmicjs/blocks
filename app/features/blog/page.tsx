import { cosmicTargetBucketConfig } from "@/lib/cosmic"
import helpers from "@/lib/helpers"
import { Markdown } from "@/components/elements/Markdown/Markdown"

export async function generateMetadata({
  searchParams,
  params,
}: {
  searchParams: {
    bucket_slug: string
    read_key: string
    write_key: string
    location: string
  }
  params: { slug: string }
}) {
  const targetBucket = {
    bucket_slug: searchParams.bucket_slug,
    read_key: searchParams.read_key,
    write_key: searchParams.write_key,
  }
  const cosmic = cosmicTargetBucketConfig(
    targetBucket.bucket_slug,
    targetBucket.read_key,
    targetBucket.write_key
  )
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: {
    bucket_slug: string
    read_key: string
    write_key: string
    location: string
  }
}) {
  const targetBucket = {
    bucket_slug: searchParams.bucket_slug,
    read_key: searchParams.read_key,
    write_key: searchParams.write_key,
  }
  const cosmic = cosmicTargetBucketConfig(
    targetBucket.bucket_slug,
    targetBucket.read_key,
    targetBucket.write_key
  )

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
        <div className="flex max-w-[750px] flex-col items-start gap-2 m-auto relative">
          <h1 className="text-3xl mb-4 font-extrabold leading-tight tracking-tighter md:text-4xl">
            {blog.title}
          </h1>
          <div className="flex">
            <img
              className="w-[60px] h-[60px] rounded-full object-cover mr-2"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div>
              Published by {blog.metadata.author.title}
              <br />
              {helpers.stringToFriendlyDate(blog.metadata.published_date)}
            </div>
            <div className="absolute right-0">
              {blog.metadata.categories.map((cat) => {
                return (
                  <span
                    className="px-3 py-1 mb-1 mr-1 rounded-xl text-white"
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
