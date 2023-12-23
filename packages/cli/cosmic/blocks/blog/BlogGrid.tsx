import { BlogCard, PostType } from "./BlogCard"
import { cosmic } from "@/cosmic/client"

export async function BlogGrid({
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
  const { objects: posts } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return (
    <>
      {posts.map((post: PostType) => {
        return <BlogCard key={post.id} post={post} />
      })}
    </>
  )
}
