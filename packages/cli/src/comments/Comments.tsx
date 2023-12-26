// components/comments.tsx
import { cosmic } from "@/cosmic/client"
import { User } from "lucide-react"

import { CommentForm } from "./CommentForm"

type Comment = {
  title: string
  slug: string
  metadata: {
    comment: string
  }
  created_at: string
}

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="mb-6 flex rounded-xl border p-4 pb-6">
      <div className="mr-2 pt-[2px] text-gray-500 dark:text-gray-200">
        <User className="h-6 w-6" />
      </div>
      <div>
        <div className="mb-2 text-lg">{comment.title}</div>
        <div className="mb-4 text-xs">
          {new Date(comment.created_at).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
        <div className="pr-6">{comment.metadata.comment}</div>
      </div>
    </div>
  )
}

export async function Comments({ resourceId }: { resourceId: string }) {
  let comments = []
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "comments",
        "metadata.approved": true,
        "metadata.resource": resourceId, // Add resource id here such as blog post or product id
      })
      .props("title,slug,metadata,created_at")
      .depth(1)
      .sort("created_at")
    comments = objects
  } catch (err) {}
  return (
    <>
      <h2 className="mb-4 text-2xl">Comments</h2>
      {comments.map((comment: Comment) => {
        return <Comment comment={comment} key={comment.slug} />
      })}
      <CommentForm resourceId={resourceId} />
    </>
  )
}
