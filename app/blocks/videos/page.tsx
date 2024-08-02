/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { VideoCard, VideoType } from "@/components/VideoCard"
import { TimeAgo } from "@/components/TimeAgo"
import { PlayArea } from "@/components/PlayArea"
import { CategoryPill, CategoryType } from "@/components/CategoryPill"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"
import Link from "next/link"

export async function generateMetadata() {
  return {
    title: `Videos`,
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

function Videos({ videos }: { videos: VideoType[] }) {
  return (
    <>
      {videos.map((video: VideoType) => {
        return <VideoCard key={video.id} video={video} />
      })}
    </>
  )
}

async function Preview() {
  const { objects: videos } = await cosmicSourceBucketConfig.objects
    .find({ type: "videos" })
    .props("id,slug,title,metadata,created_at")
    .depth(1)

  const video = videos[0]

  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Video List
      </h1>
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
          <Videos videos={videos} />
        </div>
      </div>
      <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Single Video Page
      </h1>
      <div className="w-full">
        <PlayArea video={video} />
      </div>
      <section className="m-auto mb-8 grid items-center p-4 py-8 md:container">
        <div className="relative m-auto flex w-full flex-col items-start gap-2 md:w-[750px]">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
            {video.title}
          </h1>
          <div className="mb-2 gap-4 md:flex">
            <div className="mb-4 flex items-center gap-3">
              <img
                className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
                src={`${video.metadata.channel.metadata.thumbnail.imgix_url}?w=120&auto=format,compression`}
                alt={video.metadata.channel.title}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {video.metadata.channel.title}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  <TimeAgo time={video.created_at} />
                </span>
              </div>
            </div>
            <div className="flex md:absolute md:right-0">
              {video.metadata.categories.map((category: CategoryType) => {
                return <CategoryPill key={category.id} category={category} />
              })}
            </div>
          </div>
          <div
            className="space-y-4 text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: video.metadata.description }}
          />
        </div>
      </section>
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
  const loadMoreExampleCode = dedent`
    \`\`\`jsx
    // app/blog/page.tsx
    import { BlogList } from "@/cosmic/blocks/blog/BlogList";
    import { LoadMore } from "@/cosmic/blocks/pagination/LoadMore";
    import { cosmic } from "@/cosmic/client";

    const LIMIT = 3;

    async function loadMorePosts(offset: number = 0) {
      "use server";
      const nextOffset = LIMIT + offset;
      return [
        <BlogList
          key={offset}
          query={{ type: "blog-posts" }}
          sort="-order"
          limit={LIMIT}
          skip={nextOffset}
          noWrap
        />,
        nextOffset,
      ] as const;
    }

    export default async function BlogListPage() {
      const skip = 0;
      const { total } = await cosmic.objects
        .find({ type: "blog-posts" })
        .props("id")
        .limit(1);
      return (
        <LoadMore
          loadMoreAction={loadMorePosts}
          initialOffset={skip}
          total={total}
          limit={LIMIT}
          className="max-w-[1000px] m-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-10"
        >
          <BlogList
            query={{ type: "blog-posts" }}
            sort="-order"
            limit={LIMIT}
            skip={skip}
            noWrap
          />
        </LoadMore>
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
      title: "Pagination",
      description: (
        <>
          See the{" "}
          <Link href="/blocks/pagination" className="text-cosmic-blue">
            pagination Block
          </Link>{" "}
          for installation steps and view the full examples below.
        </>
      ),
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
      title: "Pagination: Numbered pages",
      code: paginationExampleCode,
      description: "Add pagination with the pagination Block.",
    },
    {
      title: "Pagination: Load more",
      code: loadMoreExampleCode,
      description:
        "Use the load more pagination Block to fetch additional blog posts using a Server Action.",
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
