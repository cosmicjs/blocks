import { createBucketClient } from "@cosmicjs/sdk"
type CosmicConfig = any
export const cosmicSourceBucketConfig = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_SOURCE_BUCKET_SLUG || '',
  readKey: process.env.NEXT_PUBLIC_SOURCE_READ_KEY || ''
})

export const cosmicTargetBucketConfig = (
  bucketSlug: string,
  readKey: string,
  writeKey: string
) =>
  createBucketClient({
    bucketSlug,
    readKey,
    writeKey,
  })
  
export async function getSEOMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne("seo-feature")
  return object_type.metafields
}

export async function getFAQMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne("faq-feature")
  return object_type.metafields
}

export async function getPageBuilderMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "page-builder-feature"
  )
  return object_type.metafields
}

export async function getBlogMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne("blog-feature")
  return object_type.metafields
}

export async function getBlog(cosmic: CosmicConfig) {
  const { object } = await cosmic.objects.findOne({
    type: "blog-feature"
  }).props('slug,title,metadata')
  return object
}

export async function getAuthors(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects.find({
    type: "authors"
  }).limit(2).props('id,slug,title,type,metadata')
  return objects
}

export async function getCategories(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects.find({
    type: "categories"
  }).limit(2).props('id,slug,title,type')
  return objects
}

export async function addAuthors(cosmic: CosmicConfig, authors: any) {
  for (let author of authors) {
    delete author.id
    author.metadata.image = author.metadata.image.url.split('https://cdn.cosmicjs.com/')[1]
    await cosmic.objects.insertOne(author)
  }
}

export async function addCategories(cosmic: CosmicConfig, categories: any) {
  for (const category of categories) {
    delete category.id
    await cosmic.objects.insertOne(category)
  }
}

export async function addBlog(cosmic: CosmicConfig, blog: any) {
  blog.metadata.image = blog.metadata.image.url.split('https://cdn.cosmicjs.com/')[1]
  blog.type = "blog-posts"
  await cosmic.objects.insertOne(blog)
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