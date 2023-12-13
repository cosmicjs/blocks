"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Markdown } from "../elements/Markdown/Markdown"
import dedent from "dedent"
import { BucketAPILink } from "../bucket-api-link"
import { useSearchParams } from "next/navigation"
import classNames from "classnames"

type StepProps = {
  title: string
  description?: React.ReactNode
  code?: string
}

type CodeStepsProps = {
  title?: React.ReactNode
  preview?: React.ReactNode
  step1?: string[]
  step2?: string[]
  steps: StepProps[]
  scratch?: boolean
  writeKey?: boolean
}

const managers = {
  yarn: {
    install: "yarn add",
    run: "yarn",
    executable: "npx",
  },
  bun: {
    install: "bun add",
    run: "bun",
    executable: "bunx",
  },
  npm: {
    install: "npm install",
    run: "npm run",
    executable: "npx",
  },
  pnpm: {
    install: "pnpm install",
    run: "pnpm run",
    executable: "pnpm dlx",
  },
}

type PackageManager = keyof typeof managers

function replacePackageManagerCommand(command: string, pm: PackageManager) {
  // Iterate over all package managers
  for (const [_, manager] of Object.entries(managers)) {
    // If the command contains a package manager install command, replace it
    if (command.includes(manager.install)) {
      const installRegex = new RegExp(`\\b${manager.install}\\b`, "g")
      command = command.replace(installRegex, managers[pm].install)
    }

    // If the command contains a package manager executable command, replace it
    if (command.includes(manager.executable)) {
      const executableRegex = new RegExp(`\\b${manager.executable}\\b`, "g")
      command = command.replace(executableRegex, managers[pm].executable)
    }
  }

  return command
}

function wrapWithSpan(text: string) {
  return text.split("`").map((item, index) => {
    if (index % 2 === 0) return item
    return (
      <span className="bg-gray-100 px-1 py-px font-mono dark:bg-dark-gray-100">
        {item}
      </span>
    )
  })
}

const Title = ({ text }: { text: string }) => {
  return wrapWithSpan(text)
}

function Step({
  title,
  description,
  code,
  index,
  scratch,
}: StepProps & { index: number; length: number; scratch: boolean }) {
  return (
    <div className="relative mb-10">
      <div
        className={classNames(
          "absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"
        )}
      ></div>
      <div className="relative flex">
        <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
          {scratch ? index + 1 : index + 4}
        </div>
        <h3 className="text-lg font-semibold lg:text-2xl">
          <Title text={title} />{" "}
        </h3>
      </div>
      {description && <div className="py-2 text-base">{description}</div>}
      {code && <Markdown>{dedent(code)}</Markdown>}
    </div>
  )
}

function CodeSteps(props: CodeStepsProps) {
  const {
    preview,
    step1 = ["npx create-next-app@latest cosmic-app", "cd cosmic-app"],
    step2 = ["bun add @cosmicjs/sdk"],
    writeKey,
    steps,
    scratch = false,
    title,
  } = props

  const searchParams = useSearchParams()
  const manager = useMemo(() => searchParams.get("pm"), [searchParams])

  const pm = (manager || "bun") as PackageManager

  const [step1WithPm, setStep1WithPm] = useState<string[]>(step1)
  const [step2WithPm, setStep2WithPm] = useState<string[]>(step2)
  const [runStep, setRunStep] = useState<string>(
    dedent(`\`\`\`bash
    ${managers[pm || "bun"]["run"]} dev
    \`\`\`
  `)
  )

  useEffect(() => {
    const replaceSteps = () => {
      const step1Updated = step1.map((command) =>
        replacePackageManagerCommand(command, pm)
      )
      const step2Updated = step2.map((command) =>
        replacePackageManagerCommand(command, pm)
      )
      const step3Updated = dedent(`\`\`\`bash
      ${managers[pm || "bun"]["run"]} dev
      \`\`\`
    `)

      setStep1WithPm(step1Updated)
      setStep2WithPm(step2Updated)
      setRunStep(step3Updated)
    }

    replaceSteps()
  }, [pm])

  return (
    <div className="w-auto max-w-[60vw] whitespace-pre-line pt-8 lg:max-w-[750px]">
      {!scratch && (
        <div>
          <div className="mb-6">
            {title ||
              "The following code example uses Next.js, Tailwind CSS, and the Cosmic JavaScript SDK. Feel free to skip any steps that have already been completed."}
          </div>
          <div className="relative mb-10">
            <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200" />
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                1
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Install a new Next.js project
              </h3>
            </div>
            <div className="py-2">
              Note: Be sure to include TypeScript and Tailwind CSS in the
              installation options.
            </div>
            {(step1WithPm || step1)?.map((step) => (
              <Markdown>
                {dedent(`\`\`\`bash
          ${step}
          \`\`\`
          `)}
              </Markdown>
            ))}
          </div>
          <div className="relative mb-10">
            <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"></div>
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                2
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Add the Cosmic JavaScript SDK & required packages
              </h3>
            </div>
            {(step2WithPm || step2)?.map((step) => (
              <Markdown>
                {dedent(`\`\`\`bash
          ${step}
          \`\`\`
          `)}
              </Markdown>
            ))}
          </div>
          <div className="relative mb-10">
            <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"></div>
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                3
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Create a new file located at <Title text="lib/cosmic.ts" /> with
                the following
              </h3>
            </div>
            <div className="py-2">
              Note: You will need to swap <Title text={"`BUCKET_SLUG`"} /> and{" "}
              <Title text="`BUCKET_READ_KEY`" />
              with your Bucket API keys found in <BucketAPILink />.
            </div>
            <Markdown>
              {dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
${
  writeKey
    ? `writeKey: BUCKET_WRITE_KEY
            });`
    : "});"
}
            \`\`\`
            `)}
            </Markdown>
          </div>
        </div>
      )}
      {steps.map((step, index) => (
        <Step
          scratch={scratch}
          key={index}
          index={index}
          length={steps.length}
          {...step}
        />
      ))}
      {!scratch && (
        <div>
          <div className="relative mb-10">
            <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"></div>
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 4}
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">Run the app</h3>
            </div>
            <Markdown>{runStep}</Markdown>
          </div>
          <div className="relative mb-10">
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 5}
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Go to http://localhost:3000 and any page where this component
                has been added. It should look like this:
              </h3>
            </div>
          </div>
          {preview && <div>{preview}</div>}
        </div>
      )}
    </div>
  )
}

export default CodeSteps