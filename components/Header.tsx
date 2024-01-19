// components/header.tsx
import Link from "next/link"
import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { NavMenu } from "@/components/NavMenu"

export default async function Header() {
  // Header data
  const { object: settings } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1)

  return (
    <nav className="sticky top-0 z-[9999] w-full space-x-4 bg-white/20 py-2 backdrop-blur-lg dark:bg-black/20">
      <div className="flex w-full items-center justify-between pl-2 pr-4 md:container">
        <div>
          <img
            src={`${settings.metadata.logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="m-auto h-10 dark:hidden"
          />
          <img
            src={`${settings.metadata.dark_logo.imgix_url}?w=500&auto=format,compression`}
            alt={settings.metadata.company}
            className="m-auto hidden h-10 dark:block"
          />
        </div>
        <NavMenu query={{ type: "navigation-menus", slug: "header" }} />
      </div>
    </nav>
  )
}
