/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { BlogCard, PostType } from "@/components/blog-card"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  return {
    title: `Blog`,
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
  const { objects: posts } = await cosmic.objects
    .find({
      type: "blog-posts",
    })
    .props("id,slug,title,metadata")
    .depth(1)

  function Preview() {
    return (
      <>
        <section className="container m-auto grid items-center py-8">
          <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Blog
            </h1>
            <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
              {posts.map((post: PostType) => {
                return <BlogCard key={post.id} post={post} />
              })}
            </div>
          </div>
        </section>
      </>
    )
  }
  function Code() {
    const codeString = dedent`
      \`\`\`jsx
      // app/blog/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import { BlogCard, PostType } from "@/components/blog-card";

      export default async function BlogPage() {
        const { objects: posts } = await cosmic.objects
          .find({
            type: "blog-posts",
          })
          .props("id,slug,title,metadata")
          .depth(1);
        return (
          <>
            <section className="container grid items-center pb-8 m-auto">
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
    const codeBlogCardString = dedent`
    \`\`\`jsx
    // components/blog-card.tsx
    import Link from 'next/link'

    export type PostType = {
      id: string;
      title: string;
      slug: string;
      metadata: {
        image: {
          imgix_url: string;
        };
        content: string;
        author: {
          title: string;
          metadata: {
            image: {
              imgix_url: string;
            };
          };
        };
        published_date: string;
      };
    };
    
    export function BlogCard({ post }: { post: PostType }) {
      return (
        <article>
          <Link
            className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg
             shadow-2xl shadow-gray-500/20 
            transition hover:bg-gray-50 dark:bg-background dark:shadow-none dark:hover:bg-gray-900/40"
            href={\`/blog/\${post.slug}\`}
          >
            <div className="relative aspect-video h-full">
              <img
                alt=""
                className="object-cover"
                src={\`\${post.metadata.image.imgix_url}?w=1200&auto=format,compression\`}
              />
            </div>
            <div className="flex h-full flex-col justify-between rounded-b-lg border-x border-b 
            border-transparent px-5 py-8 dark:border-gray-900 md:px-8">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="line-clamp-3 w-full pt-3 text-gray-600 dark:text-gray-400">
                  {post.metadata.content.slice(0, 200)}...
                </p>
              </div>
              <div className="relative z-10 flex w-full flex-col items-start justify-between 
              space-y-10 pt-8 md:flex-row md:items-center md:space-y-0">
                <div className="flex w-full items-center gap-10 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center overflow-hidden 
                    rounded-full bg-gray-200 dark:bg-gray-800">
                      <img
                        alt={post.metadata.author.title}
                        src={\`\${post.metadata.author.metadata.image.imgix_url}?w=400&auto=format,compression\`}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div>
                        <span className="font-semibold">
                          {post.metadata.author.title}
                        </span>
                        <br />
                        {new Date(post.metadata.published_date).toLocaleDateString(
                          "en-us",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </article>
      );
    }    
    \`\`\`
    `

    const codeSinglePageString = dedent`
      \`\`\`jsx
      // app/blog/[slug]/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import Markdown from "react-markdown";
      import { ArrowLeftIcon } from "lucide-react";
      import Link from "next/link";

      export default async function SingleBlogPage({
        params,
      }: {
        params: { slug: string };
      }) {
        const { object: blog } = await cosmic.objects
          .findOne({
            type: "blog-posts",
            slug: params.slug,
          })
          .props("id,slug,title,metadata")
          .depth(1);

        return (
          <>
            <div className="mb-10 w-full max-h-[500px] overflow-hidden">
              <img
                src={\`\${blog.metadata.image.imgix_url}?w=2000&auto=format,compression\`}
                alt={blog.title}
                className="object-cover w-full"
              />
            </div>
            <section className="container grid items-center pb-8 m-auto">
              <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  {blog.title}
                </h1>
                <div className="flex mb-8">
                  <img
                    className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
                    src={\`\${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression\`}
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
                <div className="my-10">
                  <Link href="/blog" className="flex text-blue-800">
                    <ArrowLeftIcon className="w-4 h-4 mr-2 mt-1" /> Back to blog
                  </Link>
                </div>
              </div>
            </section>
          </>
        );
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK. Feel free to skip any steps that have already been
          completed.
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
            bunx create-next-app@latest cosmic-app
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add react-markdown
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
            your Bucket API keys found in <BucketAPILink />.
          </div>
          <Markdown>
            {dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
            });
            \`\`\`
            `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Add a new file located at `components/blog-card.tsx` with
            the following
          </h3>
          <Markdown>{codeBlogCardString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add a new file located at `app/blog/page.tsx` with the
            following
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 6. Add a new file located at `app/blog/[slug]/page.tsx` with
            the following
          </h3>
          <Markdown>{codeSinglePageString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 7. Go to http://localhost:3000/blog to see your blog post. It
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
      <SiteHeader tab={tab} featureKey="blog" />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}