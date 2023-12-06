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

export function BlogCard({ post }: { post: PostType }) {
  return (
    <article>
      <Link
        className="dark:bg-background group relative flex h-full w-full flex-col overflow-hidden rounded-lg shadow-2xl shadow-gray-500/20 transition hover:bg-gray-50 dark:shadow-none dark:hover:bg-gray-900/40"
        href={``}
      >
        <div className="relative aspect-video h-full">
          <img
            alt=""
            className="object-cover"
            src={`${post.metadata.image.imgix_url}?w=1200&auto=format,compression`}
          />
        </div>
        <div className="flex h-full flex-col justify-between rounded-b-lg border-x border-b border-transparent px-5 py-8 dark:border-gray-900 md:px-8">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="line-clamp-3 w-full pt-3 text-gray-600 dark:text-gray-400">
              {post.metadata.content.slice(0, 200)}...
            </p>
          </div>
          <div className="relative z-10 flex w-full flex-col items-start justify-between space-y-10 pt-8 md:flex-row md:items-center md:space-y-0">
            <div className="flex w-full items-center gap-10 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
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
