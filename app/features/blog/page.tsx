/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { BlogCard, PostType } from "@/components/blog-card"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import CodeSteps from "@/components/layouts/CodeSteps"

export const generateMetadata = async () => ({ title: `Blog` })

export default async function BlogPage({
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

async function Preview() {
  const posts = await fetchFeature<PostType>("blog-posts")
  const blog = posts[0]
  return (
    <>
      <section className="container m-auto grid items-center px-4 py-8">
        <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
          <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
            {posts.map((post: PostType) => {
              return <BlogCard key={post.id} post={post} />
            })}
          </div>
        </div>
        <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Single Post Page
          </h1>
          <>
            <div className="mb-10 max-h-[500px] w-full overflow-hidden">
              <img
                src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
                alt={blog.title}
                className="w-full object-cover"
              />
            </div>
            <section className="container m-auto grid items-center pb-8">
              <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  {blog.title}
                </h1>
                <div className="mb-8 flex">
                  <img
                    className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
                    src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
                    alt={blog.metadata.author.title}
                  />
                  <div>
                    <span className="font-semibold">
                      {blog.metadata.author.title}
                    </span>
                    <br />
                    {new Date(blog.metadata.published_date).toLocaleDateString(
                      "en-us",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                  <div className="absolute right-0">
                    {blog.metadata?.categories?.map((cat: any) => {
                      return (
                        <span
                          className="mb-1 mr-1 rounded-xl px-3 py-1 text-white"
                          style={{
                            backgroundColor: cat.metadata.color,
                          }}
                          key={cat.slug}
                        >
                          {cat.title}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <Markdown>{blog.metadata.content}</Markdown>
              </div>
            </section>
          </>
        </div>
      </section>
    </>
  )
}

function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add blog
  \`\`\`
  `

  const codeString = dedent`
    \`\`\`jsx
      // app/blog/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import { BlogCard, PostType } from "@/blocks/blog/BlogCard";

      export default async function BlogPage() {
        const { objects: posts } = await cosmic.objects
          .find({
            type: "blog-posts",
          })
          .props("id,slug,title,metadata")
          .depth(1);

        return (
          <>
            <section className="container pb-8 m-auto">
              <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  Blog
                </h1>
                <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
                  {posts.map((post: PostType) => {
                    return <BlogCard key={post.id} post={post} />;
                  })}
                </div>
              </div>
            </section>
          </>
        );
      }
    \`\`\`
    `

  const codeSinglePageString = dedent`
    \`\`\`jsx
      // app/blog/[slug]/page.tsx
      import Link from "next/link";
      import { SingleBlogPage } from "@/blocks/blog/SingleBlogPage";

      export default async function SingleBlogPage({
        params,
      }: {
        params: { slug: string };
      }) {
        return <SingleBlogPage slug={slug} type="blog-posts" locale="" />
      }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Cosmic Blog block",
      code: blockCommand,
      description:
        "This will add the files `blog/BlogCard.tsx` and `blog/SingleBlogPage.tsx` to your blocks folder.",
    },
    {
      title: "Create the blog roll page",
      code: codeString,
      description:
        "Add a new file located at `app/blog/page.tsx` with the following",
    },
    {
      title: "Create the single blog page",
      code: codeSinglePageString,
      description:
        "Add a new file located at `app/blog/[slug]/page.tsx` with the following",
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} preview={<Preview />} />
    </>
  )
}
