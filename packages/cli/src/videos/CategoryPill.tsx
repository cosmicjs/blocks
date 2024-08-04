/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { cn } from "@/cosmic/utils"

export type CategoryType = {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    emoji: string
  }
}

export function CategoryPill({
  category,
  className,
  active,
}: {
  category: CategoryType
  className?: string
  active?: boolean
}) {
  return (
    <div className={className}>
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          active
            ? "border-2 border-teal-500 bg-white dark:bg-black"
            : "border-2 bg-gray-200 dark:border-gray-900 dark:bg-gray-900",
          `flex items-center gap-2 rounded-2xl p-1 px-3`
        )}
      >
        <span>{category.metadata?.emoji}</span>
        <span>{category.title}</span>
      </Link>
    </div>
  )
}
