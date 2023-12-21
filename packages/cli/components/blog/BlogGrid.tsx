import { BlogCard, PostType } from "./BlogCard"
import { cosmic } from "@/cosmic/config"

export async function BlogGrid({ type }: { type: string }) {
  const { objects: posts } = await cosmic.objects
    .find({
      type,
    })
    .props("id,slug,title,metadata")
    .depth(1)
  return (
    <>
      {posts.map((post: PostType) => {
        return <BlogCard key={post.id} post={post} />
      })}
    </>
  )
}
