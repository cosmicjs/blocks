"use client"

import { cosmicBucketConfig } from "@/lib/cosmic"
import { Button } from "@/components/ui/button"

type FeaturesProps = {
  bucket: {
    bucket_slug: string
    read_key: string
    write_key: string
  }
}

export function Features({ bucket }: FeaturesProps) {
  const cosmic = cosmicBucketConfig(
    bucket.bucket_slug,
    bucket.read_key,
    bucket.write_key
  )

  async function getSEOMetafields() {
    const { object_type: seo_builder } = await cosmic.objectTypes.findOne(
      "seo-builders"
    )
    return seo_builder.metafields
  }

  // Set the Object type
  const object_type = "test-types"

  async function installFeature(key: string) {
    // Get the selected Object type metafields
    const {
      object_type: { metafields },
    } = await cosmic.objectTypes.findOne(object_type)

    // Get new Metafields
    let newMetafields
    if (key === "seo") newMetafields = await getSEOMetafields()
    const keyArr = newMetafields.map((obj: any) => obj.key)

    // Check for the metafields existing
    let metafieldClash
    for (const metafield of metafields) {
      if (keyArr.indexOf(metafield.key) !== -1) {
        console.log("FOUND!!!!")
        metafieldClash = true
      }
    }

    // Check for metafield key exists then add to the top of the Metafields array
    if (!metafieldClash) {
      await cosmic.objectTypes.updateOne(object_type, {
        metafields: [...newMetafields, ...metafields],
      })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">SEO fields</h2>
        <div className="mb-6">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Add SEO fields to any Object type. Fields include:
          </p>
        </div>
        <div className="mb-6">
          <ol className="list-decimal pl-8">
            <li>SEO Title</li>
            <li>SEO Description</li>
            <li>OG title</li>
            <li>OG description</li>
            <li>OG image</li>
          </ol>
        </div>
        <Button onClick={() => installFeature("seo")}>Install SEO</Button>
      </div>
      <div className="mb-8">
        <div className="mb-6">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            Add SEO fields to any Object type. Fields include:
          </p>
        </div>
        <div className="mb-6">
          <ol className="list-decimal pl-8">
            <li>SEO Title</li>
            <li>SEO Description</li>
            <li>OG title</li>
            <li>OG description</li>
            <li>OG image</li>
          </ol>
        </div>
        <Button onClick={() => installFeature("seo")}>Install SEO</Button>
      </div>
    </div>
  )
}
