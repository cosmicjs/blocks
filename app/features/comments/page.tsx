/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"
import { User } from "lucide-react"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { BucketAPILink } from "@/components/bucket-api-link"
import { CommentForm } from "@/components/comment-form"
import CodeSteps from "@/components/layouts/CodeSteps"

export default async function Testimonials({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
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

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { objects: comments } = await cosmic.objects
    .find({
      type: "comments",
      "metadata.approved": true,
    })
    .props("title,slug,metadata,created_at")
    .depth(1)
    .sort("created_at")

  return (
    <div className="py-10">
      <h2 className="mb-4 text-2xl">Comments</h2>
      {comments.map((comment: Comment) => {
        return <Comment comment={comment} key={comment.slug} />
      })}
      <CommentForm />
    </div>
  )
}
function Code() {
  const commentsFormCodeString = dedent`
  \`\`\`jsx
    // components/comment-form.tsx
    "use client"

    import { useState } from "react"
    import { CheckCircle, Loader2, XCircle } from "lucide-react"

    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Textarea } from "@/components/ui/textarea"

    export function CommentForm({ resourceId }: { resourceId: string }) {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [comment, setComment] = useState("")
      const [submitting, setSubmitting] = useState(false)
      const [sumbitted, setSubmitted] = useState(false)
      const [error, setError] = useState(false)
      async function handleSubmitComment(e: React.SyntheticEvent) {
        setError(false)
        setSubmitting(true)
        if (!name.trim() || !email.trim() || !comment.trim()) {
          setSubmitting(false)
          setError(true)
          return
        }
        const newComment = {
          type: "comments",
          title: name,
          metadata: {
            email,
            comment,
            resource: resourceId, // Add resource id here such as blog post or product id
          },
        }
        try {
          await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ comment: newComment }),
          })
        } catch (err) {
          setSubmitting(false)
          setError(true)
          return
        }
        setSubmitting(false)
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setName("")
          setEmail("")
          setComment("")
        }, 3000)
      }
      function handleChangeName(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement
        setName(target.value)
      }
      function handleChangeEmail(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement
        setEmail(target.value)
      }
      function handleChangeComment(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement
        setComment(target.value)
      }
      return (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Add a new comment</h2>
          {error && (
            <div className="border border-red-500 rounded-xl p-8 flex mb-4">
              <XCircle className="mr-4 h-4 w-4 text-red-500 top-1 relative" />
              There was an error with your request. Make sure all fields are valid.
            </div>
          )}
          {sumbitted ? (
            <div className="border border-green-500 rounded-xl p-8 flex">
              <CheckCircle className="mr-4 h-4 w-4 text-green-500 top-1 relative" />
              Comment submitted for approval.
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  onChange={handleChangeName}
                  value={name}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Your email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  onChange={handleChangeEmail}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Comment"
                  onChange={handleChangeComment}
                  value={comment}
                />
              </div>
              <div>
                <Button
                  onClick={handleSubmitComment}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    \`Submit\`
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      )
    }
  \`\`\`
  `
  const commentsCodeString = dedent`
    \`\`\`jsx
      // components/comments.tsx
      import { User } from "lucide-react";
      import { cosmic } from "@/lib/cosmic";

      import { CommentForm } from "@/components/comment-form";

      type Comment = {
        title: string;
        slug: string;
        metadata: {
          comment: string;
        };
        created_at: string;
      };

      function Comment({ comment }: { comment: Comment }) {
        return (
          <div className="border p-4 pb-6 rounded-xl mb-6 flex">
            <div className="mr-2 pt-[2px] text-gray-500 dark:text-gray-200">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg mb-2">{comment.title}</div>
              <div className="text-xs mb-4">
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
        );
      }

      export async function Comments({ resourceId }: { resourceId: string }) {
        let comments = [];
        try {
          const { objects } = await cosmic.objects
            .find({
              type: "comments",
              "metadata.approved": true,
              "metadata.resource": resourceId, // Add resource id here such as blog post or product id
            })
            .props("title,slug,metadata,created_at")
            .depth(1)
            .sort("created_at");
          comments = objects;
        } catch (err) {}
        return (
          <>
            <h2 className="text-2xl mb-4">Comments</h2>
            {comments.map((comment: Comment) => {
              return <Comment comment={comment} key={comment.slug} />;
            })}
            <CommentForm resourceId={resourceId} />
          </>
        );
      }
    \`\`\`
    `

  const commentsAPICodeString = dedent`
    \`\`\`ts
      // app/api/comments/route.ts
      import { type NextRequest } from "next/server";
      import { cosmic } from "@/lib/cosmic";

      export async function POST(request: NextRequest) {
        const res = await request.json();
        const data = await cosmic.objects.insertOne(res.comment);
        return Response.json(data);
      }
    \`\`\`
    `

  const steps = [
    {
      title:
        "Create a new file at `components/comment-form.tsx` with the following",
      code: commentsFormCodeString,
    },
    {
      title:
        "Create a new file at `components/comments.tsx` with the following",
      code: commentsCodeString,
    },
    {
      title:
        "Create a new file at `app/api/comments/route.ts` with the following",
      code: commentsAPICodeString,
    },
    {
      title:
        "Add the following to any page that needs comments and pass the Object id to connect to this specific resource. For example at a specific blog page `app/blog/[slug]/page.tsx`",
      code: dedent(`\`\`\`jsx
        // app/blog/[slug]/page.tsx
        import { Comments } from "@/components/comments";
        
        export default function BlogPost() {
          return (
            <main className="container">
              {/* page content above */}
              <Comments resourceId={blog.id} />
              {/* page content below */}
            </main>
          );
        }
      \`\`\`
    `),
    },
  ]

  return (
    <>
      <CodeSteps
        step2={[
          "bun add @cosmicjs/sdk",
          "npx shadcn-ui@latest init",
          "npx shadcn-ui@latest add button input label textarea",
        ]}
        steps={steps}
        preview={<Preview />}
        writeKey
      />
    </>
  )
}
