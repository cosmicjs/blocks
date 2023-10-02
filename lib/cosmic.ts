import { createBucketClient } from "@cosmicjs/sdk"

import { getMediaBlobFromURL } from "@/lib/utils"

type CosmicConfig = any
export const cosmicSourceBucketConfig = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_SOURCE_BUCKET_SLUG || "",
  readKey: process.env.NEXT_PUBLIC_SOURCE_READ_KEY || "",
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
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "seo-feature"
  )
  return object_type.metafields
}

export async function getFAQMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "faq-feature"
  )
  return object_type.metafields
}

export async function getPageBuilderMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "page-builder-feature"
  )
  return object_type.metafields
}

export async function getGlobalSettingsMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "global-settings-feature"
  )
  return object_type.metafields
}

export async function getNavMenuMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "navigation-menus"
  )
  return object_type.metafields
}

export async function getBlogMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "blog-posts"
  )
  return object_type.metafields
}

export async function getCategoriesMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "categories"
  )
  return object_type.metafields
}

export async function getProductsMetafields() {
  const { object_type } = await cosmicSourceBucketConfig.objectTypes.findOne(
    "products"
  )
  return object_type.metafields
}

export async function getBlog(cosmic: CosmicConfig) {
  const { object } = await cosmic.objects
    .findOne({
      type: "blog-posts",
    })
    .props("slug,title,metadata")
  return object
}

export async function getPage(cosmic: CosmicConfig) {
  const { object } = await cosmic.objects
    .findOne({
      type: "page-builder-feature",
    })
    .props("slug,title,metadata")
  return object
}

export async function getGlobalSettings(cosmic: CosmicConfig) {
  const { object } = await cosmic.objects
    .findOne({
      type: "global-settings-feature",
    })
    .props("slug,title,metadata")
  return object
}

export async function getProducts(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects
    .find({
      type: "products",
    })
    .props("slug,title,type,metadata,thumbnail")
  return objects
}

export async function getAuthors(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects
    .find({
      type: "authors",
    })
    .limit(2)
    .props("id,slug,title,type,metadata,thumbnail")
  return objects
}

export async function getCategories(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects
    .find({
      type: "categories",
    })
    .limit(2)
    .props("id,slug,title,type,thumbnail,metadata.color")
  return objects
}

export async function getNavMenus(cosmic: CosmicConfig) {
  const { objects } = await cosmic.objects
    .find({
      type: "navigation-menus",
    })
    .props("slug,title,type,metadata")
  return objects
}

export async function addAuthors(cosmic: CosmicConfig, authors: any) {
  for (let author of authors) {
    delete author.id
    const media = await getMediaBlobFromURL(
      author.metadata.image.imgix_url,
      author.title + ".jpg"
    )
    // Upload media
    const mediaRes = await cosmic.media.insertOne({ media })
    author.metadata.image = mediaRes.media.name
    author.thumbnail = mediaRes.media.name
    await cosmic.objects.insertOne(author)
  }
}

export async function addCategories(cosmic: CosmicConfig, categories: any) {
  for (const category of categories) {
    delete category.id
    const media = await getMediaBlobFromURL(
      category.thumbnail,
      category.title + ".jpg"
    )
    // Upload media
    const mediaRes = await cosmic.media.insertOne({ media })
    category.thumbnail = mediaRes.media.name
    await cosmic.objects.insertOne(category)
  }
}

export async function addBlog(cosmic: CosmicConfig, blog: any) {
  blog.type = "blog-posts"
  const media = await getMediaBlobFromURL(
    blog.metadata.image.imgix_url,
    blog.title + ".jpg"
  )
  // Upload media
  const mediaRes = await cosmic.media.insertOne({ media })
  blog.metadata.image = mediaRes.media.name
  blog.metadata.seo.og_image = mediaRes.media.name
  blog.thumbnail = mediaRes.media.name
  await cosmic.objects.insertOne(blog)
}

export async function addPage(cosmic: CosmicConfig, page: any) {
  page.type = "pages"
  const media = await getMediaBlobFromURL(
    page.metadata.image.imgix_url,
    page.title + ".jpg"
  )
  // Upload media
  const mediaRes = await cosmic.media.insertOne({ media })
  page.metadata.image = mediaRes.media.name
  page.metadata.seo.og_image = mediaRes.media.name
  page.thumbnail = mediaRes.media.name
  for (let section of page.metadata.sections) {
    section.layout = section.layout.value
    const media = await getMediaBlobFromURL(
      section.image.imgix_url,
      section.heading + ".jpg"
    )
    // Upload media
    const mediaRes = await cosmic.media.insertOne({ media })
    section.image = mediaRes.media.name
  }
  await cosmic.objects.insertOne(page)
}

export async function addProducts(cosmic: CosmicConfig, products: any) {
  for (let product of products) {
    product.type = "products"
    const media = await getMediaBlobFromURL(
      product.metadata.image.imgix_url,
      product.title + "." + product.metadata.image.imgix_url.split(".").pop()
    )
    // Upload media
    const mediaRes = await cosmic.media.insertOne({ media })
    product.metadata.image = mediaRes.media.name
    product.metadata.seo.og_image = mediaRes.media.name
    product.thumbnail = mediaRes.media.name
    for (let galleryItem of product.metadata.gallery) {
      const media = await getMediaBlobFromURL(
        galleryItem.image.imgix_url,
        product.title + "-Gallery-Image." + galleryItem.image.imgix_url.split(".").pop()
      )
      // Upload media
      const mediaRes = await cosmic.media.insertOne({ media })
      galleryItem.image = mediaRes.media.name
    }
    await cosmic.objects.insertOne(product)
  }
}

export async function addNavMenus(cosmic: CosmicConfig, menus: any) {
  for (let menu of menus) {
    await cosmic.objects.insertOne(menu)
  }
}

export async function addGlobalSettings(cosmic: CosmicConfig, settings: any) {
  settings.type = "settings"
  const media = await getMediaBlobFromURL(
    settings.metadata.logo.imgix_url,
    settings.metadata.company +
      "." +
      settings.metadata.logo.imgix_url.split(".").pop()
  )
  // Upload media
  const mediaRes = await cosmic.media.insertOne({ media })
  settings.metadata.logo = mediaRes.media.name
  settings.thumbnail = mediaRes.media.name
  for (let link of settings.metadata.links) {
    const media = await getMediaBlobFromURL(
      link.icon.imgix_url,
      link.company + "." + link.icon.imgix_url.split(".").pop()
    )
    // Upload media
    const mediaRes = await cosmic.media.insertOne({ media })
    link.icon = mediaRes.media.name
  }
  await cosmic.objects.insertOne(settings)
}

export async function addAuthorObjectType(cosmic: CosmicConfig) {
  await cosmic.objectTypes.insertOne({
    singular: "Author",
    title: "Authors",
    slug: "authors",
    emoji: "👥",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields: [
      {
        id: "author-image",
        title: "Image",
        type: "file",
        key: "image",
        media_validation_type: "image",
        value: "",
      },
    ],
  })
}

export async function addBlogObjectType(cosmic: CosmicConfig, metafields: any) {
  await cosmic.objectTypes.insertOne({
    singular: "Blog Post",
    title: "Blog Posts",
    slug: "blog-posts",
    emoji: "📝",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields,
  })
}

export async function addCategoriesObjectType(
  cosmic: CosmicConfig,
  metafields: any
) {
  await cosmic.objectTypes.insertOne({
    singular: "Category",
    title: "Categories",
    slug: "categories",
    emoji: "🔗",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields,
  })
}

export async function addPagesObjectType(
  cosmic: CosmicConfig,
  metafields: any
) {
  await cosmic.objectTypes.insertOne({
    singular: "Page",
    title: "Pages",
    slug: "pages",
    emoji: "📄",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields,
  })
}

export async function addGlobalSettingsObjectType(
  cosmic: CosmicConfig,
  metafields: any
) {
  await cosmic.objectTypes.insertOne({
    singular: "Global Settings",
    title: "Global Settings",
    slug: "settings",
    emoji: "⚙️",
    options: {
      slug_field: true,
      content_editor: false,
    },
    singleton: true,
    metafields,
  })
}

export async function addProductsObjectType(
  cosmic: CosmicConfig,
  metafields: any
) {
  await cosmic.objectTypes.insertOne({
    singular: "Product",
    title: "Products",
    slug: "products",
    emoji: "🛍",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields,
  })
}

export async function addNavMenusObjectType(
  cosmic: CosmicConfig,
  metafields: any
) {
  await cosmic.objectTypes.insertOne({
    singular: "Navigation Menu",
    title: "Navigation Menus",
    slug: "navigation-menus",
    emoji: "🖱",
    options: {
      slug_field: true,
      content_editor: false,
    },
    metafields,
  })
}