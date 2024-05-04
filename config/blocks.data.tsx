import {
  CalendarIcon,
  ChevronsRight,
  EditIcon,
  GalleryThumbnailsIcon,
  GlobeIcon,
  HelpCircleIcon,
  LayoutPanelTopIcon,
  MailIcon,
  MenuIcon,
  MessagesSquareIcon,
  PanelTop,
  QuoteIcon,
  SearchIcon,
  ShoppingCartIcon,
  UsersRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export const blocksData = [
  {
    key: "landing-page",
    title: "Landing Page",
    type: "object_type",
    slug: "pages",
    icon: (className?: string) => (
      <PanelTop className={cn("h-5 w-5 text-cosmic-blue", className)} />
    ),
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
    icon: (className?: string) => (
      <LayoutPanelTopIcon
        className={cn("h-5 w-5 text-cosmic-blue", className)}
      />
    ),
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
    icon: (className?: string) => (
      <EditIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
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
    icon: (className?: string) => (
      <MessagesSquareIcon
        className={cn(`h-5 w-5 text-cosmic-blue`, className)}
      />
    ),
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
    key: "contact-form",
    title: "Contact Form",
    type: "object_type",
    slug: "form-submissions",
    icon: (className?: string) => (
      <MailIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Adds a Form Submissions Object type to your Bucket, which includes`,
    confirmation: `This will install a \`form-submissions\` Object type to your Bucket.`,
    preview_link: "/blocks/contact-form",
    object_types: 1,
    objects: 0,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/ee060260-d001-11ee-9ce5-59949019255e-Contact-Form-dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/ee000ef0-d001-11ee-9ce5-59949019255e-Contact-Form.png",
  },
  {
    key: "events",
    title: "Events",
    type: "object_type",
    slug: "events",
    icon: (className?: string) => (
      <CalendarIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
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
    key: "ecommerce",
    title: "Ecommerce",
    type: "object_type",
    slug: "ecommerce",
    icon: (className?: string) => (
      <ShoppingCartIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Adds a Products Object type to your Bucket, which includes`,
    confirmation: `This will install a \`products\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/ecommerce",
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
    icon: (className?: string) => (
      <UsersRoundIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
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
    icon: (className?: string) => (
      <QuoteIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
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
    icon: (className?: string) => (
      <HelpCircleIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
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
    icon: (className?: string) => (
      <GalleryThumbnailsIcon
        className={cn(`h-5 w-5 text-cosmic-blue`, className)}
      />
    ),
    description: `Adds an image gallery to any existing Object type, which includes`,
    confirmation: `This will add a new Metafield with key \`image_gallery\` to the selected Object types.`,
    preview_link: "/blocks/image-gallery",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/0ac07720-a8fa-11ee-b417-db331415685f-Image-Gallery-dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/0ac902a0-a8fa-11ee-b417-db331415685f-Image-Gallery.png",
  },
  {
    key: "nav-menus",
    title: "Navigation Menu",
    type: "object_type",
    slug: "navigation-menus",
    icon: (className?: string) => (
      <MenuIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Adds a Navigation Menu Object type to your Bucket, which includes`,
    confirmation: `This will install a \`navigation-menus\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/nav-menus",
    object_types: 1,
    objects: 2,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/feec1460-9416-11ee-b62d-5b90a0a1bade-HeadersFooters-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fedd4750-9416-11ee-b62d-5b90a0a1bade-HeadersFooters.png",
  },
  {
    key: "seo",
    title: "SEO Fields",
    type: "metafields",
    slug: "seo-fields",
    icon: (className?: string) => (
      <SearchIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Adds SEO fields to any existing Object type, which includes`,
    confirmation: `This will add a new Metafield with key \`seo\` to the selected Object types.`,
    preview_link: "/blocks/seo",
    metafields: 1,
    dark_thumbnail:
      "https://imgix.cosmicjs.com/feb94490-9416-11ee-b62d-5b90a0a1bade-SEO-Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/fed81730-9416-11ee-b62d-5b90a0a1bade-SEO.png",
  },
  {
    key: "pagination",
    title: "Pagination",
    type: "none",
    slug: "pagination",
    icon: (className?: string) => (
      <ChevronsRight className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Add pagination to relevant Blocks.`,
    confirmation: ``,
    preview_link: "/blocks/pagination",
    dark_thumbnail:
      "https://imgix.cosmicjs.com/90050030-bf80-11ee-9fc1-4bb6168d3a2d-Pagination_Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/900b8fe0-bf80-11ee-9fc1-4bb6168d3a2d-Pagination.png",
  },
  {
    key: "localization",
    title: "Localization",
    type: "none",
    slug: "localization",
    icon: (className?: string) => (
      <GlobeIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Add localization selector.`,
    confirmation: ``,
    preview_link: "/blocks/localization",
    dark_thumbnail:
      "https://imgix.cosmicjs.com/90050030-bf80-11ee-9fc1-4bb6168d3a2d-Pagination_Dark.png",
    light_thumbnail:
      "https://imgix.cosmicjs.com/900b8fe0-bf80-11ee-9fc1-4bb6168d3a2d-Pagination.png",
  },
]
