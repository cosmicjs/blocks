import Link from "next/link"

export type PostType = {
  id: string
  title: string
  slug: string
  metadata: {
    categories: any
    image: {
      imgix_url: string
    }
    content: string
    author: {
      title: string
      metadata: {
        image: {
          imgix_url: string
        }
      }
    }
    published_date: string
  }
}

export function BlogCard({
  post,
  className,
}: {
  post: PostType
  className?: string
}) {
  return (
    <article className={className}>
      <Link
        className="linear group relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-zinc-50 shadow-md 
        shadow-gray-500/20 transition duration-300 hover:bg-white hover:shadow-xl dark:bg-zinc-900 dark:shadow-none dark:hover:bg-zinc-800"
        href={`/blog/${post.slug}`}
      >
        <div className="relative h-full">
          <img
            alt={post.title}
            className="h-80 w-full object-cover"
            src={`${post.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          />
        </div>
        <div
          className="flex h-full flex-col justify-between rounded-b-lg border-x border-b 
        border-transparent px-5 py-8 dark:border-gray-900 md:px-8"
        >
          <div className="relative z-10">
            {post.metadata.categories.map((category: any) => {
              return (
                <span
                  className="mr-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  key={category.slug}
                >
                  {category.title}
                </span>
              )
            })}
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-white">
              {post.title}
            </h2>
            <p className="line-clamp-3 w-full pt-3 text-gray-600 dark:text-gray-400">
              {post.metadata.content.slice(0, 200)}...
            </p>
          </div>
          <div
            className="relative z-10 flex w-full flex-col items-start justify-between 
          space-y-10 pt-8 md:flex-row md:items-center md:space-y-0"
          >
            <div className="flex w-full items-center gap-10 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center overflow-hidden 
                rounded-full bg-gray-200 dark:bg-gray-800"
                >
                  <img
                    alt={post.metadata.author.title}
                    src={`${post.metadata.author.metadata.image.imgix_url}?w=400&auto=format,compression`}
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />
                </div>
                <div>
                  <div>
                    <span className="font-semibold">
                      {post.metadata.author.title}
                    </span>
                    <br />
                    {new Date(post.metadata.published_date).toLocaleDateString(
                      "en-us",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
