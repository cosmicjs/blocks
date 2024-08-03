/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { CategoryPill, CategoryType } from "@/components/CategoryPill"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PlayArea } from "@/components/PlayArea"
import { PreviewCopy } from "@/components/PreviewCopy"
import { TimeAgo } from "@/components/TimeAgo"
import { VideoCard, VideoType } from "@/components/VideoCard"

export async function generateMetadata() {
  return {
    title: `Videos`,
  }
}

export default async function VideosPage({
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
    .depth(2)

  const video = videos[0]
  const channel = videos[0].metadata.channel
  const channelVideos = videos.filter(
    (video: VideoType) => video.metadata.channel.id === channel.id
  )

  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Video List
      </h1>
      <div className="mx-auto grid w-full grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
        <Videos videos={videos} />
      </div>
      <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
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
      <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Single Channel Page
      </h1>
      <div className="mb-6 max-h-[300px] w-full overflow-hidden">
        <img
          src={`${channel.metadata.backsplash.imgix_url}?w=2000&auto=format,compression`}
          alt={channel.title}
          className="aspect-video w-full object-cover"
        />
      </div>
      <section className="relative -top-[55px] h-[44px] max-w-[1650px] px-4 md:px-8">
        <div className="mb-6 flex items-center gap-6 pb-4">
          <img
            alt={channel.title}
            src={`${channel.metadata.thumbnail.imgix_url}?w=400&auto=format,compression`}
            className="h-[100px] w-[100px] rounded-full border-4 border-white object-cover"
          />
          <h1 className="relative top-[22px] text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
            {channel.title}
          </h1>
        </div>
      </section>
      <div className="mb-6 flex items-center border-b pb-4 dark:border-gray-800"></div>
      <section className="relative mb-8 md:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          About
        </h2>
        <div
          className="space-y-4 text-zinc-700 dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: channel.metadata.description }}
        />
      </section>
      <section className="mb-10 md:px-8">
        <h2 className="mb-4 text-2xl font-extrabold leading-tight tracking-tighter text-black dark:text-white">
          Videos
        </h2>
        <div className="grid w-full grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
          <Videos videos={channelVideos} />
        </div>
      </section>
    </div>
  )
}

function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add videos
  \`\`\`
  `
  const videoListPageCode = dedent`
  \`\`\`jsx
  // app/video/page.tsx
  import { BlogList } from "@/cosmic/blocks/videos/VideoList";
  export default async function VideoListPage() {
    return (
      <VideoList
        query={{ type: "videos" }}
        limit={10}
        skip={0}
      />
    );
  }
  \`\`\`
  `

  const singleVideoPageCode = dedent`
    \`\`\`jsx
    // app/videos/[slug]/page.tsx
    import { SingleVideo } from "@/cosmic/blocks/videos/SingleVideo";
    export default async function SingleVideoPage({
      params,
    }: {
      params: { slug: string };
    }) {
      return <SingleVideo query={{ slug: params.slug, type: "videos" }} />;
    }
    \`\`\`
    `
  const singleChannelPageCode = dedent`
    \`\`\`jsx
    // app/videos/[slug]/page.tsx
    import { SingleChannel } from "@/cosmic/blocks/videos/SingleChannel";
    export default async function SingleChannelPage({
      params,
    }: {
      params: { slug: string };
    }) {
      return <SingleChannel query={{ slug: params.slug, type: "channels" }} />;
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      code: blockCommand,
      description:
        "This will create the `videos`, `channels`, and `video-categories` Object types in your Bucket and add demo content.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `VideoCard.tsx`,`SingleVideo.tsx`,`SingleChannel.tsx`, and more to your blocks folder located in `cosmic/blocks/videos`.",
    },
    {
      title: "Usage: Video list page",
      code: videoListPageCode,
      description:
        "Add a new file located at `app/videos/page.tsx` with the following:",
    },
    {
      title: "Usage: Single video page",
      code: singleVideoPageCode,
      description:
        "Add a new file located at `app/videos/[slug]/page.tsx` with the following which will use the slug in the URL to fetch the video content.",
    },
    {
      title: "Usage: Single channel page",
      code: singleChannelPageCode,
      description:
        "Add a new file located at `app/channels/[slug]/page.tsx` with the following which will use the slug in the URL to fetch the channel content.",
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="blog" />
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
