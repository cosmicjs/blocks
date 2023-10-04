import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

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
  return (
    <div className="mb-10 grid rounded-xl border p-6 md:grid-cols-2">
      <div className="mb-4">
        <h2 className="mb-4 text-2xl font-semibold">
          {`${feature.emoji} ${feature.title}`}
        </h2>
        <div className="mb-4">
          <p className="text-lg text-gray-800 dark:text-dark-gray-800">
            {feature.description}
          </p>
        </div>
        <div className="mb-6">
          <ol className="list-decimal pl-8">
            {feature.field_list.map((item: string) => {
              return <li key={item}>{item}</li>
            })}
          </ol>
        </div>
        <div className="flex">
          <Button
            variant="secondary"
            onClick={() => handleInstallClick(feature.key)}
          >
            Install
          </Button>
          {feature.preview_link && feature.preview_link && (
            <>
              <Link
                href={feature.preview_link}
                rel="noreferrer"
                className={cn(
                  "ml-2",
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
              >
                Preview
              </Link>
              <Link
                href={`${feature.preview_link}?tab=code`}
                rel="noreferrer"
                className={cn(
                  "ml-2",
                  buttonVariants({
                    variant: "secondary",
                  })
                )}
              >
                Code
              </Link>
            </>
          )}
        </div>
      </div>
      <div>
        {feature.preview_link && feature.screenshot && (
          <Link href={feature.preview_link}>
            <img
              src={`${feature.screenshot}?w=1200&auto=format,compression`}
              className="h-full max-h-[400px] w-full rounded-xl object-cover object-top"
            />
          </Link>
        )}
      </div>
    </div>
  )
}
