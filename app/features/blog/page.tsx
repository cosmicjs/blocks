/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import helpers from "@/lib/helpers"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  const cosmic = cosmicSourceBucketConfig
  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
      slug: "our-amazing-adventure",
    })
    .props("title")
    .depth(1)
  return {
    title: `${blog.title}`,
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { object: blog } = await cosmic.objects
    .findOne({
      type: "blog-posts",
      slug: "our-amazing-adventure",
    })
    .props("slug,title,metadata")
    .depth(1)

  function Preview() {
    return (
      <>
        <div className="mb-6 w-full">
          <img
            src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
            alt={blog.title}
            className="object-cover"
          />
        </div>
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {blog.title}
          </h1>
          <div className="flex">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div>
              Published by {blog.metadata.author.title}
              <br />
              {helpers.stringToFriendlyDate(blog.metadata.published_date)}
            </div>
            <div className="absolute right-0">
              {blog.metadata.categories.map((cat: any) => {
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
      </>
    )
  }
  function Code() {
    const codeString = dedent`
      \`\`\`jsx
      import { createBucketClient } from "@cosmicjs/sdk";
      const cosmic = createBucketClient({
        bucketSlug: "BUCKET_SLUG",
        readKey: "BUCKET_READ_KEY",
      });
      
      import Markdown from "react-markdown";

      export default async function BlogPage() {
        
        const { object: blog } = await cosmic.objects
          .findOne({
            type: "blog-posts",
            slug: "our-amazing-adventure",
          })
          .props("slug,title,metadata")
          .depth(1);
        
        return (
          <section className="container grid items-center pb-8 m-auto">
            <div className="mb-6 w-full">
              <img
                src={\`\${blog.metadata.image.imgix_url}?w=2000&auto=format,compression\`}
                alt={blog.title}
                className="object-cover"
              />
            </div>
            <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                {blog.title}
              </h1>
              <div className="flex">
                <img
                  className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
                  src={\`\${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression\`}
                  alt={blog.metadata.author.title}
                />
                <div>
                  Published by {blog.metadata.author.title}
                  <br />
                  {blog.metadata.published_date}
                </div>
                <div className="absolute right-0">
                  {blog.metadata.categories.map((cat: any) => {
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
                    );
                  })}
                </div>
              </div>
              <Markdown>{blog.metadata.content}</Markdown>
            </div>
          </section>
        );
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK.
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
            {dedent(
              `\`\`\`bash
            npx create-next-app@latest cosmic-app
            cd cosmic-app
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(
              `\`\`\`bash
              yarn add @cosmicjs/sdk
              yarn add react-markdown
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Add a new file located at `app/blog/page.jsx` with the
            following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(
              `\`\`\`bash
            yarn dev
            \`\`\`
          `
            )}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000/blog to see your blog post. It
            should look like this:
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
