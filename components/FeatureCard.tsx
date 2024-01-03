/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { ThemedImage } from "./elements/ThemedImage/ThemedImage"
import FeatureStats from "./FeatureStats"

type Feature = {
  key: string
  title: string
  icon: React.ReactNode
  type: string
  description: string
  field_list: string[]
  preview_link?: string
  confirmation?: string
  dark_thumbnail?: string
  light_thumbnail?: string
  object_types?: number
  objects?: number
  metafields?: number
}

export function FeatureCard({ feature }: { feature: Feature }) {
  if (!feature?.preview_link) return null

  return (
    <>
      <div className="relative !cursor-pointer overflow-hidden">
        <Link href={feature?.preview_link}>
          <div className="grid md:grid-cols-1">
            <div className="overflow-hidden rounded-3xl">
              <ThemedImage
                lightSrc={`${feature?.light_thumbnail}?w=1200&auto=format,compression`}
                darkSrc={`${feature?.dark_thumbnail}?w=1200&auto=format,compression`}
                className="h-[250px] w-full rounded-3xl object-cover object-top"
                alt={`Feature preview`}
              />
            </div>
            <div>
              <h2 className="mb-1 mt-4 text-2xl font-bold">{feature.title}</h2>
              <FeatureStats
                objectTypes={feature?.object_types}
                objects={feature?.objects}
                metafields={feature?.metafields}
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
