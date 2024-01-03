// components/nav-menu.tsx
import Link from "next/link"
import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { MobileNav } from "@/components/MobileNav"

export type ItemType = { title: string; link: string; open_in_new_tab: boolean }

export async function NavMenu({ query }: { query: any }) {
  const { object: nav } = await cosmicSourceBucketConfig.objects
    .findOne(query)
    .props("metadata")
    .depth(1)
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div>
          {nav.metadata.items.map((item: ItemType) => {
            return (
              <div
                key={item.title}
                className="group inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
              >
                {item.title}
              </div>
            )
          })}
        </div>
      </div>
      {/* Mobile */}
      <MobileNav items={nav.metadata.items} />
    </>
  )
}