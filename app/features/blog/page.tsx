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
        <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Blog Grid
        </h1>
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
      import { BlogGrid } from "@/cosmic/blocks/blog/BlogGrid";

      export default async function BlogPage() {
        const query = { 
          type: "blog-posts",
          locale: ""
        }
        return <BlogGrid query={query} sort="-created_at" limit={10} skip={0} />
      }
    \`\`\`
    `

  const codeSinglePageString = dedent`
    \`\`\`jsx
      // app/blog/[slug]/page.tsx
      import { SingleBlogBlock } from "@/cosmic/blocks/blog/SingleBlog";
      export default async function SingleBlogPage({ slug }: { slug: string }) {
        const query = { 
          slug,
          locale: "",
          type: "blog-posts",
        }
        return <SingleBlogBlock query={query} />
      }
    \`\`\`
    `

  const envVarsCode = dedent`
    \`\`\`
      # .local.env
      COSMIC_BUCKET_SLUG=change_to_your_bucket_slug
      COSMIC_READ_KEY=change_to_your_bucket_read_key
      COSMIC_WRITE_KEY=change_to_your_bucket_write_key
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Cosmic Blog block",
      code: blockCommand,
      description:
        "This will add the files `BlogCard.tsx` and `SingleBlogPage.tsx` to your blocks folder located in `cosmic/blocks/blog`.",
    },
    {
      title: "Create your ENV vars file",
      code: envVarsCode,
      description:
        "Go to Project / Bucket / Settings / API keys to add your API keys to your project.",
    },
    {
      title: "Create the blog grid page",
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
