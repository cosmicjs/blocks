import {
  GalleryThumbnailsIcon,
  HelpCircleIcon,
  LayoutPanelTopIcon,
  MenuIcon,
  MessagesSquareIcon,
  MonitorStopIcon,
  QuoteIcon,
  SearchIcon,
  ShoppingCartIcon,
  UsersRoundIcon,
  CalendarIcon,
  EditIcon,
} from "lucide-react"

export const blocksData = [
  {
    key: "landing-page",
    title: "Landing Page",
    type: "object_type",
    slug: "pages",
    icon: <MonitorStopIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Pages Object type to your Bucket, which includes`,
    confirmation: `This will install a \`pages\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/landing-page",
    object_types: 1,
    objects: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/fe811d90-9416-11ee-b62d-5b90a0a1bade-Pages-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fed3d170-9416-11ee-b62d-5b90a0a1bade-Pages.png",
  },
  {
    key: "layout",
    title: "Layout",
    type: "object_type",
    slug: "global-settings",
    icon: <LayoutPanelTopIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Navigation Menu and Global Settings Object type to your Bucket, which includes`,
    confirmation: `This will install a \`navigation-menus\` and \`global-settings\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/layout",
    object_types: 2,
    objects: 3,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/feec1460-9416-11ee-b62d-5b90a0a1bade-HeadersFooters-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fedd4750-9416-11ee-b62d-5b90a0a1bade-HeadersFooters.png",
  },
  {
    key: "blog",
    title: "Blog",
    type: "object_type",
    slug: "blog-posts",
    icon: <EditIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Blog Posts Object type to your Project, which includes`,
    confirmation: `This will install the following Object types: \`blog-posts\`,\`authors\`, and \`categories\` as well as demo content.`,
    preview_link: "/blocks/blog",
    object_types: 3,
    objects: 2,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/ff0b0e10-9416-11ee-b62d-5b90a0a1bade-Blog-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/ff078ba0-9416-11ee-b62d-5b90a0a1bade-Blog.png",
  },
  {
    key: "comments",
    title: "Comments",
    type: "object_type",
    slug: "comments",
    icon: <MessagesSquareIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Comments Object type to your Bucket, which includes`,
    confirmation: `This will install a \`comments\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/comments",
    object_types: 1,
    objects: 5,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/fee05490-9416-11ee-b62d-5b90a0a1bade-Comments-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fef0a840-9416-11ee-b62d-5b90a0a1bade-Comments.png",
  },
  {
    key: "events",
    title: "Events",
    type: "object_type",
    slug: "events",
    icon: <CalendarIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds an Events Object type to your Bucket, which includes`,
    confirmation: `This will install an \`events\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/events",
    object_types: 1,
    objects: 3,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/0ac1d6b0-a8fa-11ee-b417-db331415685f-Events-dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/0ab9e770-a8fa-11ee-b417-db331415685f-Events.png",
  },
  {
    key: "products",
    title: "Products",
    type: "object_type",
    slug: "products",
    icon: <ShoppingCartIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Products Object type to your Bucket, which includes`,
    confirmation: `This will install a \`products\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/products",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/fe8192c0-9416-11ee-b62d-5b90a0a1bade-Shop-Dark.png",
    light_thumbnail:
      "https://cdn.cosmicjs.com/fedcab10-9416-11ee-b62d-5b90a0a1bade-Shop-Light.png",
  },
  {
    key: "team",
    title: "Team",
    type: "object_type",
    slug: "team-members",
    icon: <UsersRoundIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Team Members Object type to your Bucket, which includes`,
    confirmation: `This will install a \`team-members\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/team",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/ff09ae80-9416-11ee-b62d-5b90a0a1bade-Team-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/feff7550-9416-11ee-b62d-5b90a0a1bade-Team.png",
  },
  {
    key: "testimonials",
    title: "Testimonials",
    type: "object_type",
    slug: "testimonials",
    icon: <QuoteIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds a Testimonials Object type to your Bucket, which includes`,
    confirmation: `This will install a \`testimonials\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/testimonials",
    object_types: 1,
    objects: 4,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/fedf9140-9416-11ee-b62d-5b90a0a1bade-Testimonials-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/feddbc80-9416-11ee-b62d-5b90a0a1bade-Testimonials.png",
  },
  {
    key: "faqs",
    title: "FAQs",
    type: "metafields",
    slug: "faqs",
    icon: <HelpCircleIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds an FAQs feature to any existing Object type, which includes`,
    confirmation: `This will add a new Metafield with key \`faqs\` to the selected Object types.`,
    preview_link: "/blocks/faqs",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/feffea80-9416-11ee-b62d-5b90a0a1bade-FAQs-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fefa6c40-9416-11ee-b62d-5b90a0a1bade-FAQs.png",
  },
  {
    key: "image-gallery",
    title: "Image Gallery",
    type: "metafields",
    slug: "image-gallery",
    icon: <GalleryThumbnailsIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds an image gallery to any existing Object type, which includes`,
    confirmation: `This will add a new Metafield with key \`image_gallery\` to the selected Object types.`,
    preview_link: "/blocks/image-gallery",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/0ac07720-a8fa-11ee-b417-db331415685f-Image-Gallery-dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/0ac902a0-a8fa-11ee-b417-db331415685f-Image-Gallery.png",
  },
  // {
  //   key: "nav-menus",
  //   title: "Navigation Menu",
  //   type: "object_type",
  //   slug: "navigation-menus",
  //   icon: <MenuIcon className="h-5 w-5 text-cosmic-blue" />,
  //   description: `Adds a Navigation Menu Object type to your Bucket, which includes`,
  //   confirmation: `This will install a \`navigation-menus\` Object type to your Bucket as well as demo content.`,
  //   preview_link: "/blocks/nav-menus",
  //   object_types: 1,
  //   objects: 2,
  //   dark_thumbnail:
  //     "https://imgix.cosmicjs.com/feec1460-9416-11ee-b62d-5b90a0a1bade-HeadersFooters-Dark.png",
  //   light_thumbnail:
  //     "https://imgix.cosmicjs.com/fedd4750-9416-11ee-b62d-5b90a0a1bade-HeadersFooters.png",
  // },
  {
    key: "seo",
    title: "SEO Fields",
    type: "metafields",
    slug: "seo-fields",
    icon: <SearchIcon className="h-5 w-5 text-cosmic-blue" />,
    description: `Adds SEO fields to any existing Object type, which includes`,
    confirmation: `This will add a new Metafield with key \`seo\` to the selected Object types.`,
    preview_link: "/blocks/seo",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/feb94490-9416-11ee-b62d-5b90a0a1bade-SEO-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fed81730-9416-11ee-b62d-5b90a0a1bade-SEO.png",
  },
]
