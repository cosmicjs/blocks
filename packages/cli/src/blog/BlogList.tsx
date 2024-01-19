import { BlogCard, PostType } from "./BlogCard"
import { cosmic } from "@/cosmic/client"

export async function BlogList({
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
  const { objects: posts } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")

  return (
    <div
      className={`m-auto flex max-w-[900px] flex-col gap-4 px-4 md:flex-row ${className}`}
    >
      {posts.map((post: PostType) => {
        return <BlogCard key={post.id} post={post} />
      })}
    </div>
  )
}
