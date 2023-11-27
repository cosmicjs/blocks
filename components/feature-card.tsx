/* eslint-disable @next/next/no-img-element */
import Link from "next/link";



import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowDownOnSquareIcon, CodeBracketIcon, EyeIcon } from "@heroicons/react/24/solid";

type Feature = {
  key: string
  title: string
  emoji: string
  type: string
  description: string
  field_list: string[]
  preview_link?: string
  confirmation?: string
  screenshot?: string
}

export function FeatureCard({
  feature,
  handleInstallClick,
}: {
  feature: Feature
  handleInstallClick: any
}) {
  if (!feature.preview_link) return null

  return (
    <Link href={feature.preview_link}>
      <div className="relative group">
      <div className="opacity-0 group-hover:opacity-100 flex transition duration-[50] ease-linear absolute px-5 bottom-20 mx-auto inset-x-0">
          <Button
          className="w-full"
            onClick={() => handleInstallClick(feature.key)}
            iconRight={<ArrowDownOnSquareIcon className="w-4 h-4"/>}
          >
            Install
          </Button>
          {feature.preview_link && feature.preview_link && (
            <>
              <Button
                href={`${feature.preview_link}?tab=preview`}
                rel="noreferrer"
                iconRight={<EyeIcon className="w-4 h-4"/>}
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
                href={`${feature.preview_link}?tab=code`}
                rel="noreferrer"
                iconRight={<CodeBracketIcon className="w-4 h-4"/>}
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
      <div className="grid rounded-xl md:grid-cols-1">
        <div>
          <img
            src={`${feature.screenshot}?w=1200&auto=format,compression`}
            className="h-[250px] w-full rounded-2xl object-cover object-top"
            alt={`Feature preview`}
          />
        </div>
        <div>
          <h2 className="mb-1 mt-4 text-2xl font-bold">{feature.title}</h2>
          <p className="text-dark-gray-600 dark:text-dark-gray-600">
            3 Object types • 2 Objects
          </p>
        </div>
      </div></div>
    </Link>
  )
}