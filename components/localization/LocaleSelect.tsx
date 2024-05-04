import Link from "next/link"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"

import locales from "./locales.json"

export async function LocaleSelect({
  defaultLocale,
  linkPath,
  objectType,
  className,
}: {
  defaultLocale: string
  linkPath?: string
  objectType: string
  className?: string
}) {
  // Localization switch
  const { object_type } =
    await cosmicSourceBucketConfig.objectTypes.findOne(objectType)
  const localeData = locales.filter((l) => defaultLocale === l.code)[0]
  return (
    <div className={className}>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={
              <>
                <span className="mr-1">{localeData.flag}</span>{" "}
                <span>{localeData.title}</span>
              </>
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-black">
          {object_type.locales.map((locale: string) => {
            const localeData = locales.filter((l) => locale === l.code)[0]
            return (
              <Link
                className="block bg-white p-2 dark:bg-black"
                key={locale}
                href={linkPath ? linkPath.replace("[locale]", locale) : ""}
              >
                <span className="mr-1">{localeData.flag}</span>{" "}
                <span>{localeData.title}</span>
              </Link>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
