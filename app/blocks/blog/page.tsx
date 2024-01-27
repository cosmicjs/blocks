/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { BlogCard, PostType } from "@/components/BlogCard"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

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
  const date = getFormattedDate(blog.metadata.published_date)

  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Blog List
      </h1>
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
          {posts.map((post: PostType) => {
            return <BlogCard key={post.id} post={post} />
          })}
        </div>
      </div>
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Single Post Page
        </h1>
        <>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
            {blog.title}
          </h1>
          <div className="mb-10 w-full overflow-hidden rounded-xl">
            <img
              src={`${blog.metadata.image.imgix_url}?w=2000&auto=format,compression`}
              alt={blog.title}
              className="w-full object-cover"
            />
          </div>
          <div className="mb-2 md:flex">
            <img
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${blog.metadata.author.metadata.image.imgix_url}?w=120&auto=format,compression`}
              alt={blog.metadata.author.title}
            />
            <div className="mb-4 flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {blog.metadata.author.title}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">{date}</span>
            </div>
            <div className="md:absolute md:right-0">
              {blog.metadata.categories.map((category: any) => {
                const categoryBackgroundColor = `${category.metadata.color}22`
                return (
                  <span
                    className="mb-1 mr-1 rounded-xl px-3 py-1 text-black/70 dark:text-white/70"
                    style={{
                      backgroundColor: categoryBackgroundColor,
                      border: `1px solid ${category.metadata.color}`,
                    }}
                    key={category.slug}
                  >
                    {category.title}
                  </span>
                )
              })}
            </div>
          </div>
          <Markdown className="space-y-4 text-zinc-700 dark:text-zinc-300">
            {blog.metadata.content}
          </Markdown>
        </>
      </div>
    </div>
  )
}

function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add blog
  \`\`\`
  `
  const blogListPageCode = dedent`
  \`\`\`jsx
  // app/blog/page.tsx
  import { BlogList } from "@/cosmic/blocks/blog/BlogList";
  export default async function BlogListPage() {
    return (
      <BlogList
        query={{ type: "blog-posts" }}
        sort="-created_at"
        limit={10}
        skip={0}
      />
    );
  }
  \`\`\`
  `

  const singlePageCode = dedent`
    \`\`\`jsx
    // app/blog/[slug]/page.tsx
    import { SingleBlog } from "@/cosmic/blocks/blog/SingleBlog";
    export default async function SingleBlogPage({
      params,
    }: {
      params: { slug: string };
    }) {
      return <SingleBlog query={{ slug: params.slug, type: "blog-posts" }} />;
    }
    \`\`\`
    `
  const draftPreviewCode = dedent`
    \`\`\`jsx
    // app/blog/[slug]/page.tsx
    import { SingleBlog } from "@/cosmic/blocks/blog/SingleBlog";
    export default async function SingleBlogPage({
      params,
      searchParams,
    }: {
      params: { slug: string };
      searchParams?: {
        status: "draft" | "published" | "any";
      };
    }) {
      return (
        <SingleBlog
          query={{ slug: params.slug, type: "blog-posts" }}
          status={searchParams?.status}
        />
      );
    }

    \`\`\`
    `
  const localizationCode = dedent`
    \`\`\`jsx
    // app/[locale]/blog/page.tsx
    import { BlogList } from "@/cosmic/blocks/blog/BlogList";
    export default async function BlogListPage({
      params,
    }: {
      params: { locale: string };
    }) {
      return (
        <BlogList
          query={{ type: "blog-posts", locale: params.locale }}
          sort="-created_at"
          limit={10}
          skip={0}
        />
      );
    }
    \`\`\`
    `
  const paginationCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add pagination
    \`\`\`
    `

  const paginationUsageCode = dedent`
    \`\`\`jsx
    <Pagination query={{ type: "blog-posts" }} path="/blog" limit={2} page={1} />
    \`\`\`
    `

  const paginationExampleCode = dedent`
    \`\`\`jsx
    // app/blog/page.tsx
    import { BlogList } from "@/cosmic/blocks/blog/BlogList";
    import { Pagination } from "@/cosmic/blocks/pagination/Pagination";

    export default async function BlogListPage({
      searchParams,
    }: {
      searchParams?: {
        page: number;
      };
    }) {
      const page = Number(searchParams?.page ? searchParams?.page : 1);
      const LIMIT = 1; // Set the post limit here
      const skip = page * LIMIT - LIMIT;
      return (
        <>
          <BlogList
            query={{ type: "blog-posts" }}
            sort="-order"
            limit={LIMIT}
            skip={skip}
            className="mb-10"
          />
          <Pagination
            query={{ type: "blog-posts" }}
            path="/blog"
            limit={LIMIT}
            page={page}
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
        "This will create the `blog-posts`, `authors`, and `categories` Object types in your Bucket and add demo content.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `BlogCard.tsx`,`BlogList.tsx`, and `SingleBlog.tsx` to your blocks folder located in `cosmic/blocks/blog`.",
    },
    {
      title: "Usage: Blog list page",
      code: blogListPageCode,
      description:
        "Add a new file located at `app/blog/page.tsx` with the following:",
    },
    {
      title: "Usage: Single blog page",
      code: singlePageCode,
      description:
        "Add a new file located at `app/blog/[slug]/page.tsx` with the following which will use the slug in the URL to fetch the blog content.",
    },
    {
      title: "Install pagination Block",
      code: paginationCommand,
      description:
        "This will add the file `Pagination.tsx` to your blocks folder located in `cosmic/blocks/pagination`.",
    },
    {
      title: "Usage: Pagination",
      code: paginationUsageCode,
      description:
        "Add the pagination Block to your code with the following. See how to use this with the `BlogList.tsx` Block in the examples section below.",
    },
  ]

  const examples = [
    {
      title: "Draft preview",
      code: draftPreviewCode,
      description:
        "Enable draft preview by setting the `status` property on the Block. View the draft preview content by setting the `?status=any` in the URL. Note: This is a basic example. It is advisable to consider a security strategy if you intend to keep your preview private.",
    },
    {
      title: "Draft preview link in the dashboard",
      description:
        "To add the draft preview link in the dashboard, go to Blog Object type > Settings and add your preview link in the dashboard under Additional Settings. For example adding the link `http://localhost:3000/blog/[object_slug]?status=any` will add a Preview button to each blog post.",
    },
    {
      title: "Pagination",
      code: paginationExampleCode,
      description: "Add pagination with the pagination Block.",
    },
    {
      title: "Localization",
      code: localizationCode,
      description:
        "First, enable localization in the dashboard by going to Blog Object type > Settings under Additional Settings. Then set the locale on your specific Object. Finally, pass the `locale` parameter into the query to fetch your localized content. Create a new file at `app/[locale]/blog/page.tsx` with the following. Then go to any page with localization set, for example: `https://localhost:3000/es/blog` or `https://localhost:3000/en/blog`.",
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="blog" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Examples</h3>
      </div>
      <CodeSteps scratch steps={examples} featureKey="blog" />
    </>
  )
}

const getFormattedDate = (inputDate: string) => {
  const dateParts = inputDate.split("-")

  const year = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1
  const day = parseInt(dateParts[2])

  // Create a new Date object using UTC timezone
  const date = new Date(Date.UTC(year, month, day))

  // Format the date in UTC
  const formattedDate = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return formattedDate
}
