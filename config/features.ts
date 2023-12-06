export const features = [
  {
    key: "pages",
    title: "Pages",
    type: "object_type",
    slug: "pages",
    emoji: "📄",
    description: `Adds a Pages Object type to your Bucket, which includes`,
    field_list: [
      "Hero image",
      "Rich text content",
      "Repeating layouts in: 1 column and alternating 2 columns with headline, image, and rich text content.",
    ],
    confirmation: `This will install a \`pages\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/page",
    object_types: 1,
    objects: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27b1b620-8de1-11ee-b62d-5b90a0a1bade-Pages-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27ac10d0-8de1-11ee-b62d-5b90a0a1bade-Pages.png",
  },
  {
    key: "blog",
    title: "Blog",
    type: "object_type",
    slug: "blog-posts",
    emoji: "📝",
    description: `Adds a Blog Posts Object type to your Project. Blo, which includes`,
    field_list: [
      "Hero image",
      "Content in Markdown",
      "Author single Object relationship Metafield",
      "Categories multiple Object relationship Metafield",
    ],
    confirmation: `This will install the following Object types: \`blog-posts\`,\`authors\`, and \`categories\` as well as demo content.`,
    preview_link: "/features/blog",
    object_types: 3,
    objects: 2,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27f46470-8de1-11ee-b62d-5b90a0a1bade-Blog-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27f045c0-8de1-11ee-b62d-5b90a0a1bade-Blog.png",
  },
  {
    key: "comments",
    title: "Comments",
    type: "object_type",
    slug: "comments",
    emoji: "💬",
    description: `Adds a Comments Object type to your Bucket, which includes`,
    field_list: ["Email", "Comment", "Resource", "Approved"],
    confirmation: `This will install a \`comments\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/comments",
    object_types: 1,
    objects: 5,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27ce65e0-8de1-11ee-b62d-5b90a0a1bade-Comments-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27dc96b0-8de1-11ee-b62d-5b90a0a1bade-Comments.png",
  },
  {
    key: "faqs",
    title: "FAQs",
    type: "metafields",
    slug: "faqs",
    emoji: "❓",
    description: `Adds an FAQs feature to any existing Object type.`,
    field_list: ["Question", "Answer"],
    confirmation: `This will add a new Metafield with key \`faqs\` to the selected Object types.`,
    preview_link: "/features/faqs",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27de6b70-8de1-11ee-b62d-5b90a0a1bade-FAQs-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/2793a6d0-8de1-11ee-b62d-5b90a0a1bade-FAQs.png",
  },
  {
    key: "navigation_menus",
    title: "Navigation Menus",
    type: "object_type",
    slug: "navigation-menus",
    emoji: "🖱",
    description: `Adds a Navigation Menus Object type to your Bucket, which includes`,
    field_list: [
      "Links repeater with title, link, and option to open in a new browser tab",
    ],
    confirmation: `This will install a \`navigation-menus\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/nav-menus",
    object_types: 1,
    objects: 2,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27dd8110-8de1-11ee-b62d-5b90a0a1bade-Headers-and-Footers-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27cae370-8de1-11ee-b62d-5b90a0a1bade-Headers-and-Footers.png",
  },
  {
    key: "products",
    title: "Products",
    type: "object_type",
    slug: "products",
    emoji: "🛍️",
    description: `Adds a Products Object type to your Bucket, which includes`,
    field_list: [
      "Image",
      "Image gallery with repeating image and description",
      "Price",
      "Quantity",
      "Description",
    ],
    confirmation: `This will install a \`products\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/products",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27df7ce0-8de1-11ee-b62d-5b90a0a1bade-Products-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27ed3880-8de1-11ee-b62d-5b90a0a1bade-Products.png",
  },
  {
    key: "image-gallery",
    title: "Image Gallery",
    type: "metafields",
    slug: "image-gallery",
    emoji: "🏞",
    description: `Adds an image gallery to any existing Object type, which includes`,
    field_list: [
      "Image",
      "Description"
    ],
    confirmation: `This will add a new Metafield with key \`image_gallery\` to the selected Object types.`,
    preview_link: "/features/image-gallery",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27d87800-8de1-11ee-b62d-5b90a0a1bade-SEO-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27d7b4b0-8de1-11ee-b62d-5b90a0a1bade-SEO.png",
  },
  {
    key: "seo",
    title: "SEO fields",
    type: "metafields",
    slug: "seo-fields",
    emoji: "🔍",
    description: `Adds SEO fields to any existing Object type, which includes`,
    field_list: [
      "SEO Title",
      "SEO Description",
      "OG title",
      "OG description",
      "OG image",
    ],
    confirmation: `This will add a new Metafield with key \`seo\` to the selected Object types.`,
    preview_link: "/features/seo",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27d87800-8de1-11ee-b62d-5b90a0a1bade-SEO-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27d7b4b0-8de1-11ee-b62d-5b90a0a1bade-SEO.png",
  },
  {
    key: "global_settings",
    title: "Global Settings",
    type: "object_type",
    slug: "global-settings",
    emoji: "⚙️",
    description: `Adds a Global Settings Object type to your Bucket, which includes`,
    field_list: [
      "Company name",
      "Logo image",
      "Contact email",
      "Phone number",
      "Repeater Metafield with fields for social links: title, URL, and logo.",
    ],
    confirmation: `This will install a \`global-settings\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/settings",
    object_types: 1,
    objects: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27f32bf0-8de1-11ee-b62d-5b90a0a1bade-Socials-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27db5e30-8de1-11ee-b62d-5b90a0a1bade-Socials.png",
  },
  {
    key: "team",
    title: "Team",
    type: "object_type",
    slug: "team-members",
    emoji: "👥",
    description: `Adds a Team Members Object type to your Bucket, which includes`,
    field_list: ["Image", "Position", "Bio", "Links for X and LinkedIn"],
    confirmation: `This will install a \`team-members\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/team",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27f54ed0-8de1-11ee-b62d-5b90a0a1bade-Team-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27e04030-8de1-11ee-b62d-5b90a0a1bade-Team.png",
  },
  {
    key: "testimonials",
    title: "Testimonials",
    type: "object_type",
    slug: "testimonials",
    emoji: "🗣️",
    description: `Adds a Testimonials Object type to your Bucket, which includes`,
    field_list: ["Company", "Position", "Image", "Quote"],
    confirmation: `This will install a \`testimonials\` Object type to your Bucket as well as demo content.`,
    preview_link: "/features/testimonials",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/27dbd360-8de1-11ee-b62d-5b90a0a1bade-Testimonials-1.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/27df07b0-8de1-11ee-b62d-5b90a0a1bade-Testimonials.png",
  },
]
