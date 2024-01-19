import Link from "next/link"
import { cosmic } from "@/cosmic/client"
import { MobileNav } from "./MobileNav"

export type ItemType = { title: string; link: string; open_in_new_tab: boolean }

export async function NavMenu({
  query,
  className,
  status,
  hasMobileMenu,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
  hasMobileMenu?: boolean
}) {
  const { object: nav } = await cosmic.objects
    .findOne(query)
    .props("metadata")
    .depth(1)
    .status(status ? status : "published")
  return (
    <div className={className}>
      {/* Desktop */}
      <div className={hasMobileMenu ? "hidden md:block" : ""}>
        {nav.metadata.items.map((item: ItemType) => {
          return (
            <Link
              href={item.link}
              key={item.title}
              target={item.open_in_new_tab ? "_blank" : ""}
              className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-900 dark:data-[state=open]:bg-zinc-900 md:w-max"
            >
              {item.title}
            </Link>
          )
        })}
      </div>
      {/* Mobile */}
      {hasMobileMenu && <MobileNav items={nav.metadata.items} />}
    </div>
  )
}
