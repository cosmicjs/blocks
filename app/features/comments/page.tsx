/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"
import { UserRound } from "lucide-react"
import Link from "next/link"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
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
  const date = new Date(comment.created_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <div className="mb-6 flex flex-col rounded-xl border border-zinc-300 p-4 pb-6 dark:border-zinc-700">
      <div className="mb-4 flex w-full items-center justify-between gap-2 text-gray-500 dark:text-gray-200">
        <div className="flex items-center gap-2 text-black dark:text-white">
          <UserRound className="h-4 w-4" />
          <div className="text-lg">{comment.title}</div>
        </div>
        <div className="text-xs">{date}</div>
      </div>
      <div className="pr-6 text-zinc-700 dark:text-zinc-300">
        {comment.metadata.comment}
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
  const importCode = dedent`
    \`\`\`jsx
      import { Comments } from "@/cosmic/blocks/comments/Comments";
    \`\`\`
    `
  const usageCode = dedent`
    \`\`\`jsx
      <Comments
        query={{
          type: "comments",
          "metadata.resource": "object-id",
          "metadata.approved": true,
        }}
      />
    \`\`\`
    `
  const exampleCode = dedent`
    \`\`\`jsx
      // app/blog/[slug]/page.tsx
      import { SingleBlog } from "@/cosmic/blocks/blog/SingleBlog";
      import { Comments } from "@/cosmic/blocks/comments/Comments";
      import { cosmic } from "@/cosmic/client";
      
      export default async function SingleBlogPage({
        params,
      }: {
        params: { slug: string };
      }) {
        const { object } = await cosmic.objects.findOne({
          slug: params.slug,
          type: "blog-posts",
        }).props("id");
        return (
          <>
            <SingleBlog query={{ slug: params.slug, type: "blog-posts" }} />
            <Comments
              className="m-auto max-w-[750px] mt-4 w-full"
              query={{
                type: "comments",
                "metadata.resource": object.id,
                "metadata.approved": true,
              }}
            />
          </>
        );
      }
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

  const steps = [
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
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description:
        "Add the block to your app with the `query` property set to fetch your specific content.",
    },
    {
      title: "Example",
      code: exampleCode,
      description: (
        <>
          Add the following to a single blog post file
          `app/blog/[slug]/page.tsx`. Note: this assumes you have installed the{" "}
          <Link href="/features/blog" className="text-cosmic-blue">
            Blog Block
          </Link>
          .
        </>
      ),
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
