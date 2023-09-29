import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 p-4 md:gap-10">
      <Link href="/" className="flex items-center space-x-4">
        <Icons.cosmic className="h-6 w-6" />
      </Link>
    </div>
  )
}
