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
  UploadIcon,
  VideoIcon,
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
  },
  {
    key: "videos",
    title: "Videos",
    type: "object_type",
    slug: "videos",
    icon: (className?: string) => (
      <VideoIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Adds a Videos Object type to your Bucket, which includes`,
    confirmation: `This will install a \`videos\` Object type to your Bucket as well as demo content.`,
    preview_link: "/blocks/videos",
    object_types: 3,
    objects: 9,
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
  },
  {
    key: "file-upload",
    title: "File Upload",
    type: "none",
    slug: "file-upload",
    icon: (className?: string) => (
      <UploadIcon className={cn(`h-5 w-5 text-cosmic-blue`, className)} />
    ),
    description: `Add file uploader.`,
    confirmation: ``,
    preview_link: "/blocks/file-upload",
  },
]
