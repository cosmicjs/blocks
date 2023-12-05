/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { cn, pluralize } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ArrowDownOnSquareIcon,
  CodeBracketIcon,
  EyeIcon,
} from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { ThemedImage } from "./elements/ThemedImage/ThemedImage"

type Feature = {
  key: string
  title: string
  emoji: string
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

export function FeatureCard({
  feature,
  handleInstallClick,
}: {
  feature: Feature
  handleInstallClick?: any
}) {
  const router = useRouter()

  if (!feature?.preview_link) return null

  return (
    <>
      <div className="pointer-cursor group relative overflow-hidden">
        {handleInstallClick && (
          <div className="duration-[50] absolute inset-x-0 bottom-20 z-10 mx-auto flex px-5 opacity-0 transition ease-linear group-hover:opacity-100">
            <Button
              className="relative z-20 w-full"
              onClick={(e) => handleInstallClick(feature.key)}
              iconRight={<ArrowDownOnSquareIcon className="h-4 w-4" />}
            >
              Install
            </Button>
            {feature.preview_link && feature.preview_link && (
              <>
                <Button
                  onClick={() =>
                    router.push(`${feature.preview_link}?tab=preview`)
                  }
                  iconRight={<EyeIcon className="h-4 w-4" />}
                  className={cn(
                    "ml-2 w-full",
                    buttonVariants({
                      variant: "secondary",
                    })
                  )}
                >
                  Preview
                </Button>
                <Button
                  onClick={() =>
                    router.push(`${feature.preview_link}?tab=code`)
                  }
                  iconRight={<CodeBracketIcon className="h-4 w-4" />}
                  className={cn(
                    "ml-2 w-full",
                    buttonVariants({
                      variant: "secondary",
                    })
                  )}
                >
                  Code
                </Button>
              </>
            )}
          </div>
        )}
        <Link href={feature?.preview_link}>
          <div className="grid md:grid-cols-1">
            <div className="overflow-hidden rounded-3xl">
              <ThemedImage
                lightSrc={`${feature?.light_thumbnail}?w=1200&auto=format,compression`}
                darkSrc={`${feature?.dark_thumbnail}?w=1200&auto=format,compression`}
                className="h-[250px] w-full rounded-3xl object-cover object-top group-hover:blur-[5px]"
                alt={`Feature preview`}
              />
            </div>
            <div>
              <h2 className="mb-1 mt-4 text-2xl font-bold">{feature.title}</h2>
              <p className="text-dark-gray-600 dark:text-dark-gray-600">
                {feature?.object_types}{" "}
                {feature?.object_types &&
                  `${pluralize("Object type", feature?.object_types)} •`}{" "}
                {feature?.objects}{" "}
                {feature?.objects &&
                  `${pluralize("Object type", feature?.objects)}`}
                {feature?.metafields}{" "}
                {feature?.metafields &&
                  `${pluralize("Metafield", feature?.metafields)}`}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
