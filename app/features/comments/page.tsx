/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CommentForm } from "@/components/comment-form"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export default async function Testimonials({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { objects: comments } = await cosmic.objects
    .find({
      type: "comments",
      "metadata.approved": true,
    })
    .props("title,slug,metadata,created_at")
    .depth(1)
    .sort("created_at")
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
      <div className="border p-8 rounded-xl mb-6">
        <div className="text-lg mb-2">{comment.title}</div>
        <div className="text-xs mb-4">
          {new Date(comment.created_at).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
        <div className="text-slate-400">{comment.metadata.comment}</div>
      </div>
    )
  }
  function Preview() {
    return (
      <div className="py-10">
        <h2 className="text-2xl mb-4">Comments</h2>
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
          <div className="border p-8 rounded-xl mb-6">
            <div className="text-lg mb-2">{comment.title}</div>
            <div className="text-xs mb-4">
              {new Date(comment.created_at).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div className="text-slate-400">{comment.metadata.comment}</div>
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
      import { type NextRequest } from "next/server";
      import { cosmic } from "@/lib/cosmic";

      export async function POST(request: NextRequest) {
        const res = await request.json();
        const data = await cosmic.objects.insertOne(res.comment);
        return data;
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, Shad CN UI, and
          the Cosmic JavaScript SDK.
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 1. Install a new Next.js project
          </h3>
          <div className="py-2">
            Note: Be sure to include TypeScript and Tailwind CSS in the
            installation options.
          </div>
          <Markdown>
            {dedent(`\`\`\`bash
            npx create-next-app@latest cosmic-app
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK and the Shad CN UI packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            yarn add @cosmicjs/sdk
            npx shadcn-ui@latest init
            npx shadcn-ui@latest add input
            npx shadcn-ui@latest add label
            npx shadcn-ui@latest add textarea
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Create a new file located at `lib/cosmic.ts` with the
            following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
            Be careful not to expose your write key to any client-side code.
          </div>
          <Markdown>
            {dedent(`\`\`\`ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
              writeKey: "BUCKET_WRITE_KEY",
            });
            \`\`\`
            `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Create a new file at `components/comments-form.tsx` with the
            following
          </h3>
          <Markdown>{commentsFormCodeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Create a new file at `components/comments.tsx` with the
            following
          </h3>
          <Markdown>{commentsCodeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 6. Create a new file at `app/api/comments/route.ts` with the
            following
          </h3>
          <Markdown>{commentsAPICodeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 7. Add the following to any page that needs comments and pass
            the Object id to connect to this specific resource.
          </h3>
          <Markdown>
            {dedent(`\`\`\`jsx
            import { Comments } from "@/components/comments";
            
            export default function Home() {
              return (
                <main className="container">
                  {/* page content above */}
                  <Comments resourceId={page.id} />
                  {/* page content below */}
                </main>
              );
            }
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 8. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            yarn dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 9. Go to http://localhost:3000 and any page where this comments
            feature has been added. It should look like this:
          </h3>
        </div>
        <div className="mb-6">
          <Preview />
        </div>
      </div>
    )
  }
  return (
    <>
      <SiteHeader tab={tab} />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
