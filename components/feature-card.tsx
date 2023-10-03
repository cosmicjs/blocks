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
}

export function FeatureCard({
  feature,
  handleInstallClick,
}: {
  feature: Feature
  handleInstallClick: any
}) {
  return (
    <div className="mb-10 rounded-xl border p-6">
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
          Install Feature
        </Button>
        {feature.preview_link && (
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
        )}
      </div>
    </div>
  )
}
