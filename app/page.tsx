import { cosmicTargetBucketConfig } from "@/lib/cosmic"
import { Features } from "@/components/features"
import { SiteHeader } from "@/components/site-header"

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
  const cosmicTargetBucket = cosmicTargetBucketConfig(
    targetBucket.bucket_slug,
    targetBucket.read_key,
    targetBucket.write_key
  )
  let objectTypes = []
  try {
    objectTypes = (await cosmicTargetBucket.objectTypes.find()).object_types
  } catch {}

  return (
    <>
      <SiteHeader page="home" />
      <section className="container grid items-center gap-6 p-4 pb-8 pt-6 md:py-10 lg:w-[980px]">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          🏗 Cosmic Feature Builder
        </h1>
        <p>
          Use the Cosmic Feature Builder to install specific features to your
          Cosmic Project. Save development time and learn content modeling best
          practices. Extend the features to suit your needs.
        </p>
        <Features targetBucket={targetBucket} objectTypes={objectTypes} />
      </section>
    </>
  )
}
