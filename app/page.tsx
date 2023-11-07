import { Features } from "@/components/features"
import Logo from "@/components/logo"

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

  return (
    <>
      <section className="container grid items-center gap-6 p-4 pb-8 pt-6 md:py-10 lg:w-[980px]">
        <Logo className="w-40" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Use Cosmic Blocks to install specific features to your
          Cosmic Project. Save development time and learn content modeling best
          practices. Extend the features to suit your needs.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-xl font-bold">How to use</span>
          To use these Blocks:
          <ol className="list-decimal pl-8">
            <li>
              Click &quot;Install&quot; to install the template Object type to
              your Bucket, then
            </li>
            <li>
              Click &quot;Code&quot; to follow the steps to copy / paste the
              code to your website codebase.
            </li>
          </ol>
        </div>
        <Features targetBucket={targetBucket} />
      </section>
    </>
  )
}
