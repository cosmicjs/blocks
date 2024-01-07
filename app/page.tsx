import BigHeading from "@/components/BigHeading"
import { Blocks } from "@/components/Blocks"
import Header from "@/components/layouts/Header"
import { cosmicSourceBucketConfig } from "@/lib/cosmic"

export async function generateMetadata() {
  const { object: page } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "landing-pages",
      slug: "home",
    })
    .props("title,metadata")
    .depth(1)
  return {
    title: page.metadata.seo?.title || page.title,
    description: page.metadata?.seo.description,
    openGraph: {
      title: page.metadata.seo?.og_title,
      description: page.metadata.seo?.og_description,
      images: [page.metadata.seo?.og_image?.imgix_url],
    },
  }
}

export default async function IndexPage({
  searchParams,
}: {
  searchParams: {
    bucket_slug: string
    read_key: string
    write_key: string
    location: string
  }
}) {
  const targetBucket = {
    bucket_slug: searchParams.bucket_slug,
    read_key: searchParams.read_key,
    write_key: searchParams.write_key,
  }
  const { object: page } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "landing-pages",
      slug: "home",
    })
    .props("title,metadata")
    .depth(1)
  return (
    <>
      <section className="grid items-center gap-6 p-4 pb-8 pt-6 md:py-10">
        <Header />
        <div className="container relative z-30 mx-auto">
          <BigHeading
            scrollId="get-started"
            subheading="Get Started"
            heading={page?.metadata?.get_started?.headline}
            description={page?.metadata?.get_started?.subheadline}
            className="mb-12 mt-10 md:my-20 xl:mt-0"
          />
          <Blocks targetBucket={targetBucket} />
        </div>
      </section>
    </>
  )
}
