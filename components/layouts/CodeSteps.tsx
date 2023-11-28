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
  footer?: React.ReactNode
  step1?: string[]
  step2?: string[]
  steps: StepProps[]
}

const pmCommands = {
  npm: "install",
  yarn: "add",
  pnpm: "add",
  bun: "install",
}

type PackageManager = keyof typeof pmCommands

function replacePackageManagerCommand(command: string, pm: PackageManager) {
  // Iterate over all package manager commands
  for (const [pmKey, pmCommand] of Object.entries(pmCommands)) {
    // If the command contains a package manager command, replace it
    if (command.includes(pmCommand)) {
      command = command.replace(pmCommand, pmCommands[pm] || pmCommand)
    }
  }

  // If the command contains a package manager name, replace it
  for (const pmKey of Object.keys(pmCommands)) {
    if (command.includes(pmKey)) {
      command = command.replace(pmKey, pm || pmKey)
    }
  }

  return command
}

function Step({
  title,
  description,
  code,
  index,
}: StepProps & { index: number; length: number }) {
  const isLastStep = index === length + 3

  return (
    <div className="relative mb-10">
      <div
        className={classNames(
          "absolute -left-[42px] top-7 w-px bg-gray-200 dark:bg-dark-gray-200",
          {
            "h-[100%] dark:fade-out": isLastStep,
            "h-[110%]": !isLastStep,
          }
        )}
      ></div>
      <div className="relative flex">
        <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
          {index + 4}
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      {description && <div className="py-2 text-base">{description}</div>}
      {code && <Markdown>{dedent(code)}</Markdown>}
    </div>
  )
}

function CodeSteps(props: CodeStepsProps) {
  const {
    footer,
    step1 = ["npx create-next-app@latest cosmic-app", "cd cosmic-app"],
    step2 = ["bun add @cosmicjs/sdk"],
    steps,
  } = props

  const searchParams = useSearchParams()
  const manager = useMemo(() => searchParams.get("pm"), [searchParams])

  const pm = (manager || "bun") as PackageManager

  const [step1WithPm, setStep1WithPm] = useState<string[]>(step1)
  const [step2WithPm, setStep2WithPm] = useState<string[]>(step2)

  useEffect(() => {
    const replaceSteps = () => {
      const step1Updated = step1.map((command) =>
        replacePackageManagerCommand(command, pm)
      )
      const step2Updated = step2.map((command) =>
        replacePackageManagerCommand(command, pm)
      )
      setStep1WithPm(step1Updated)
      setStep2WithPm(step2Updated)
    }

    replaceSteps()
  }, [pm])

  console.log("manager", manager, step2WithPm)

  return (
    <div className="pt-8">
      <div className="mb-6">
        The following code example uses Next.js, Tailwind CSS, and the Cosmic
        JavaScript SDK. Feel free to skip any steps that have already been
        completed.
      </div>
      <div className="relative mb-10">
        <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"></div>
        <div className="relative flex">
          <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
            1
          </div>
          <h3 className="text-2xl font-semibold">
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
          <h3 className="text-2xl font-semibold">
            Add the Cosmic JavaScript SDK.
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
          <h3 className="text-2xl font-semibold">
            Create a new file located at `lib/cosmic.ts` with the following
          </h3>
        </div>
        <div className="py-2">
          Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
          your Bucket API keys found in <BucketAPILink />.
        </div>
        <Markdown>
          {dedent(`\`\`\`ts
          // lib/cosmic.ts
          import { createBucketClient } from "@cosmicjs/sdk";
          export const cosmic = createBucketClient({
            bucketSlug: "BUCKET_SLUG",
            readKey: "BUCKET_READ_KEY",
          });
          \`\`\`
          `)}
        </Markdown>
      </div>
      {steps.map((step, index) => (
        <Step key={index} index={index} length={steps.length} {...step} />
      ))}
      {footer && <div className="">{footer}</div>}
    </div>
  )
}

export default CodeSteps
