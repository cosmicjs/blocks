export function featureInfo(featureKey: string) {
  let title
  let type
  switch (featureKey) {
    case "seo":
      title = "SEO"
      type = "metafields"
      break
    case "faqs":
      title = "FAQs"
      type = "metafields"
      break
    case "page_builder":
      title = "Page Builder"
      type = "object_type"
      break
    case "products":
      title = "Products"
      type = "object_type"
      break
    case "blog":
      title = "Blog"
      type = "object_type"
      break
    case "navigation_menus":
      title = "Navigation Menus"
      type = "object_type"
      break
    case "global_settings":
      title = "Global Settings"
      type = "object_type"
      break
  }
  return {
    title,
    type,
  }
}

export const features = [
  {
    key: "blog",
    title: "📝 Blog",
    description: `Adds three new Object types to your Bucket with slugs
    \`blog-posts\`,\`authors\`, and \`categories\`. Blog fields include:`,
    field_list: [
      "Hero image",
      "Content in Markdown",
      "Author Object relationship Metafield",
      "SEO fields (see below)",
    ],
  },
  {
    key: "page_builder",
    title: "📄 Page Builder",
    description: `Adds a new Object type with slug \`pages\` to your Bucket. Fields
    include:`,
    field_list: [
      "Hero image",
      "Rich text content",
      "Repeating layouts in: 1 column and alternating 2 columns with headline, image, and rich text content.",
      "SEO fields (see below)",
    ],
  },
  {
    key: "products",
    title: "🛍️ Products",
    description: `Adds a new Object type with slug \`products\` to your Bucket. Fields
    include:`,
    field_list: [
      "Image",
      "Image gallery with repeating image and description",
      "Price",
      "Quantity",
      "Description",
      "SEO fields (see below)",
    ],
  },
  {
    key: "navigation_menus",
    title: "🖱 Navigation Menus",
    description: `Adds an Object type with slug \`navigation-menus\` to your Bucket. Fields
    include:`,
    field_list: [
      "Links repeater with title and URL",
    ],
  },
  {
    key: "global_settings",
    title: "⚙️ Global Settings",
    description: `Adds a new singular Object type with slug \`settings\` to your Bucket. Fields
    include:`,
    field_list: [
      "Company name",
      "Logo image",
      "Contact email",
      "Repeater Metafield with fields for social links: title, URL, and logo.",
    ],
  },
  {
    key: "seo",
    title: "🔍 SEO fields",
    description: `Adds a parent Metafield with key \`seo\` to an existing Object type with the following children:`,
    field_list: [
      "SEO Title",
      "SEO Description",
      "OG title",
      "OG description",
      "OG image",
    ],
  },
  {
    key: "faqs",
    title: "❓ FAQs",
    description: `Adds a repeater Metafield with key \`faqs\` to an existing Object type with the following children:`,
    field_list: ["Question", "Answer"],
  },
]