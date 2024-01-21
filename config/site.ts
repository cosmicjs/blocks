export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Blocks",
  description:
    "Use Blocks to build common content-powered features for your website or app. Save development time and learn content modeling best practices.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    x: "https://x.com/cosmicjs",
    github: "https://github.com/cosmicjs/cosmic-feature-templates",
    docs: "https://www.cosmicjs.com/docs",
    login: "https://app.cosmicjs.com/login",
  },
}

export const packageManagers = [
  { title: "bun", value: "bun" },
  { title: "npm", value: "npm" },
  { title: "yarn", value: "yarn" },
  { title: "pnpm", value: "pnpm" },
]
