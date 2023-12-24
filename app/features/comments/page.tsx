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
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add comments
  \`\`\`
  `

  const commentsAPICodeString = dedent`
    \`\`\`ts
      // app/api/comments/route.ts
      import { type NextRequest } from "next/server";
      import { cosmic } from "@/cosmic/client";
      
      export async function POST(request: NextRequest) {
        const res = await request.json();
        const data = await cosmic.objects.insertOne(res.comment);
        return Response.json(data);
      }
    \`\`\`
    `

  const envVarsCode = dedent`
    \`\`\`
      # .env.local
      COSMIC_BUCKET_SLUG=change_to_your_bucket_slug
      COSMIC_READ_KEY=change_to_your_bucket_read_key
      COSMIC_WRITE_KEY=change_to_your_bucket_write_key
    \`\`\`
    `

  const steps = [
    {
      title: "Create your ENV vars file",
      code: envVarsCode,
      apiKeysLink: true,
    },
    {
      title: "Install the Block content model",
      code: blockCommand,
      description:
        "This will create the `comments` Object type in your Bucket and add demo content.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `CommentForm.tsx`,`Comments.tsx`, and components to your blocks folder located in `cosmic/blocks/comments`.",
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
        import { Comments } from "@/cosmic/blocks/comments/Comments";
        
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
        steps={steps}
        preview={<Preview />}
        writeKey
        featureKey="comments"
      />
    </>
  )
}
