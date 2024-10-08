/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"
import { UserRound } from "lucide-react"
import Link from "next/link"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CommentForm } from "@/components/CommentForm"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

export async function generateMetadata() {
  return {
    title: `Comments`,
  }
}

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
      <div className="mb-4 flex w-full flex-col justify-between gap-2 text-gray-500 dark:text-gray-200 sm:flex-row">
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
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
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
        "This will add the files `CommentForm.tsx`,`Comments.tsx`, `actions.tsx` server actions, and components to your blocks folder located in `cosmic/blocks/comments`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage: Blog post",
      code: exampleCode,
      description: (
        <>
          Add the following to a single blog post file
          `app/blog/[slug]/page.tsx`. Note 1: this assumes you have installed
          the{" "}
          <Link href="/blocks/blog" className="text-cosmic-blue">
            Blog Block
          </Link>
          . Note 2: this will only show approved comments. Approve the comments
          from the Cosmic dashboard.
        </>
      ),
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} writeKey featureKey="comments" />
    </>
  )
}
