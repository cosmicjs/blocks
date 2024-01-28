import { BlogCard, PostType } from "./BlogCard"
import { cosmic } from "@/cosmic/client"

function BlogPosts({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map((post: PostType) => {
        return <BlogCard key={post.id} post={post} />
      })}
    </>
  )
}

export async function BlogList({
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
  const { objects: posts } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  if (noWrap) return <BlogPosts posts={posts} />
  return (
    <div className={`m-auto grid max-w-[900px] grid-cols-2 gap-4 ${className}`}>
      <BlogPosts posts={posts} />
    </div>
  )
}
