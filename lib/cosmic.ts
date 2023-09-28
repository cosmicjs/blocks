import { createBucketClient } from "@cosmicjs/sdk"

type CosmicConfig = any
export const cosmicBucketConfig = (
  bucketSlug: string,
  readKey: string,
  writeKey: string
) =>
  createBucketClient({
    bucketSlug,
    readKey,
    writeKey,
  })


export async function getSEOMetafields(cosmic: CosmicConfig) {
  const { object_type } = await cosmic.objectTypes.findOne("seo-feature")
  return object_type.metafields
}

export async function getFAQMetafields(cosmic: CosmicConfig) {
  const { object_type } = await cosmic.objectTypes.findOne("faq-feature")
  return object_type.metafields
}

export async function getPageBuilderMetafields(cosmic: CosmicConfig) {
  const { object_type } = await cosmic.objectTypes.findOne(
    "page-builder-feature"
  )
  return object_type.metafields
}

export async function getBlogMetafields(cosmic: CosmicConfig) {
  const { object_type } = await cosmic.objectTypes.findOne("blog-feature")
  return object_type.metafields
}

export async function addAuthorObjectType(cosmic: CosmicConfig) {
  await cosmic.objectTypes.insertOne({
    singular: "Author",
    title: "Authors",
    slug: "authors",
    emoji: "👥",
    options: {
      slug_field: true
    },
    metafields: [{
      id: "author-image",
      title: "Image",
      type: "file",
      key: "image",
      media_validation_type: "image",
      value: ""
    }]
  })
}

export async function addBlogObjectType(cosmic: CosmicConfig, metafields: any) {
  await cosmic.objectTypes.insertOne({
    singular: "Blog Post",
    title: "Blog Posts",
    slug: "blog-posts",
    emoji: "📝",
    options: {
      slug_field: true
    },
    metafields,
  })
}

export async function addCategoriesObjectType(cosmic: CosmicConfig) {
  await cosmic.objectTypes.insertOne({
    singular: "Category",
    title: "Categories",
    slug: "categories",
    emoji: "🔗",
    options: {
      slug_field: true
    },
  })
}

export async function addPagesObjectType(cosmic: CosmicConfig, metafields: any) {
  await cosmic.objectTypes.insertOne({
    singular: "Page",
    title: "Pages",
    slug: "pages",
    emoji: "📄",
    options: {
      slug_field: true
    },
    metafields,
  })
}