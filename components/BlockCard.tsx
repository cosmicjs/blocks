/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import BlockStats from "./BlockStats"

export type BlockData = {
  key: string
  title: string
  icon: any
  type: string
  description: string
  preview_link?: string
  confirmation?: string
  object_types?: number
  objects?: number
  metafields?: number
}

export function BlockCard({ feature }: { feature: BlockData }) {
  if (!feature?.preview_link) return null

  return (
    <Link
      className="flex rounded-lg border border-gray-200 bg-white p-4 text-gray-800 transition-all duration-100 hover:border-gray-300 dark:border-dark-gray-200 dark:bg-gray-800 dark:text-dark-gray-800 hover:dark:bg-gray-700"
      href={feature?.preview_link}
    >
      {feature.icon("h-10 w-10 mr-6")}
      <div>
        <h2 className="mb-1 text-2xl font-bold">{feature.title}</h2>
        <BlockStats
          objectTypes={feature?.object_types}
          objects={feature?.objects}
          metafields={feature?.metafields}
        />
      </div>
    </Link>
  )
}
