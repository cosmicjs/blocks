import classNames from "classnames"
import React from "react"
import dedent from "dedent"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { BucketAPILink } from "@/components/BucketAPILink"
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
                Create a .env file
              </h3>
            </div>
            <div className="mt-2">
              Create a {wrapWithSpan(`\`.env.local\``)} file. Go to{" "}
              <BucketAPILink /> to get your Cosmic API keys.
            </div>
            <Markdown>
              {dedent(`\`\`\`
          # .env.local
          COSMIC_BUCKET_SLUG=change_to_your_bucket_slug
          COSMIC_READ_KEY=change_to_your_bucket_read_key
          COSMIC_WRITE_KEY=change_to_your_bucket_write_key
          \`\`\`
          `)}
            </Markdown>
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
