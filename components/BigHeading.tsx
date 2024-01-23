import classNames from "classnames"
import React from "react"
import dedent from "dedent"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import ENVKeys from "./ENVKeys"

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
              existing Next.js app (v13+). Read the last FAQ at the bottom of
              this page for more instructions on what options to include.
            </div>
            {["bunx create-next-app@latest cosmic-app; cd cosmic-app"]?.map(
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
          <ENVKeys />
          <div className="relative mb-8">
            <div className="relative flex flex-col">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                3
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Select your Blocks
              </h3>
              {description && <div className="mt-2">{description}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BigHeading
