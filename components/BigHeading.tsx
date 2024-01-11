"use client"

import classNames from "classnames"
import React, { useEffect, useState } from "react"
import dedent from "dedent"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { BucketAPILink } from "@/components/BucketAPILink"
import APIKeysDialog from "./APIKeysDialog"
import { Button } from "./ui/button"
import { hideMiddleOfString } from "@/lib/utils"
import CodeBlock from "./elements/CodeBlock/CodeBlock"
import CopyButton from "./elements/CopyButton/CopyButton"
// import { wrapWithSpan } from "@/components/layouts/CodeSteps" Can't seem to get this to work
export function wrapWithSpan(text: string) {
  return text?.split("`")?.map((item, index) => {
    if (index % 2 === 0) return item
    return (
      <span
        key={item}
        className="rounded-sm bg-gray-100 px-1 py-px font-mono dark:bg-dark-gray-100"
      >
        {item}
      </span>
    )
  })
}

type BigHeadingProps = {
  subheading?: string
  heading: string
  description?: string
  className?: string
  scrollId?: string
}

const BigHeading: React.FC<BigHeadingProps> = ({
  heading,
  subheading,
  description,
  className,
  scrollId,
}) => {
  const [openKeysModal, setOpenKeysModal] = useState(false)

  const [bucketSlug, setBucketSlug] = useState("")
  const [readKey, setReadKey] = useState("")
  const [writeKey, setWriteKey] = useState("")

  useEffect(() => {
    const bucketSlug = localStorage.getItem("bucket_slug") || ""
    const readKey = localStorage.getItem("read_key") || ""
    const writeKey = localStorage.getItem("write_key") || ""
    setBucketSlug(bucketSlug)
    setReadKey(readKey)
    setWriteKey(writeKey)
  }, [])

  const hasKeysConfigured = !!bucketSlug && !!readKey && !!writeKey

  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 -top-28 z-20 h-2 bg-cosmic-blue/0"
        id={scrollId}
      />
      <div className={classNames("mx-auto text-center", className)}>
        {subheading && (
          <h4 className="mb-6 text-lg font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-400 md:text-3xl">
            {subheading}
          </h4>
        )}
        <h2 className="bg-gradient-to-r from-dark-purple-gradient to-cosmic-bright-blue bg-clip-text pb-4 text-3xl font-extrabold text-transparent md:text-5xl">
          {heading}
        </h2>
        <div className="m-auto mb-20 mt-6 w-auto max-w-[60vw] whitespace-pre-line text-left lg:max-w-[750px]">
          <div className="relative pb-8">
            <div className="absolute left-[-42px] top-7 h-[95%] w-px bg-gray-200 dark:bg-dark-gray-200" />
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                1
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Create a new Next.js project
              </h3>
            </div>
            <div className="py-2">
              You can skip this step if you are installing Blocks into an
              existing Next.js app (v13+). Note: Be sure to include TypeScript
              and Tailwind CSS in the installation options.
            </div>
            {["bunx create-next-app@latest cosmic-app", "cd cosmic-app"]?.map(
              (step) => (
                <Markdown key={step}>
                  {dedent(`\`\`\`bash
          ${step}
          \`\`\`
          `)}
                </Markdown>
              )
            )}
          </div>
          <div className="relative pb-8">
            <div className="absolute left-[-42px] top-7 h-[95%] w-px bg-gray-200 dark:bg-dark-gray-200" />
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                2
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Get and save your API keys
              </h3>
            </div>
            {!hasKeysConfigured && (
              <>
                <APIKeysDialog
                  open={openKeysModal}
                  onClose={() => setOpenKeysModal(false)}
                  onSave={(bucketSlug, readKey, writeKey) => {
                    setBucketSlug(bucketSlug)
                    setReadKey(readKey)
                    setWriteKey(writeKey)
                  }}
                />
                <Button
                  onClick={() => setOpenKeysModal(true)}
                  className="absolute inset-0 top-[18%] z-10 m-auto w-fit"
                >
                  Add API Keys
                </Button>
              </>
            )}
            {!bucketSlug ? (
              <div className="mt-2">
                Get your API keys by going to <BucketAPILink /> then add them by
                clicking the button below.
              </div>
            ) : (
              <div className="mt-2">
                Use the copy button to paste the following code with your keys
                pre-filled to your {wrapWithSpan(`\`.env.local\``)} file.
              </div>
            )}
            <div className="relative">
              {bucketSlug && (
                <CopyButton
                  className="absolute right-3 top-[20px] z-10 !bg-gray-800"
                  iconOnly
                  text={`
            # .env.local
            COSMIC_BUCKET_SLUG=${bucketSlug}
            COSMIC_READ_KEY=${readKey}
            COSMIC_WRITE_KEY=${writeKey}`}
                />
              )}
              <Markdown
                showCopy={false}
                className={classNames({
                  "opacity-50 blur-sm": !hasKeysConfigured,
                })}
              >
                {dedent(`\`\`\`
          # .env.local
          COSMIC_BUCKET_SLUG=${bucketSlug}
          COSMIC_READ_KEY=${hideMiddleOfString(readKey)}
          COSMIC_WRITE_KEY=${hideMiddleOfString(writeKey)}
          \`\`\`
          `)}
              </Markdown>
            </div>
          </div>
          <div className="relative mb-8">
            <div className="relative flex flex-col">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                3
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Select your Blocks
              </h3>
              {description && (
                <div className="mt-2">
                  <p>{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BigHeading
