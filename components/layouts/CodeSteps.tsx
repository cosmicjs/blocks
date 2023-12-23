"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Markdown } from "../elements/Markdown/Markdown"
import dedent from "dedent"
import { BucketAPILink } from "../bucket-api-link"
import { useSearchParams } from "next/navigation"
import classNames from "classnames"
import { Button } from "@/components/ui/button"
import { InstallDialog } from "@/components/install-dialog"

type StepProps = {
  title: string
  description?: string | React.ReactNode
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
  featureKey?: string
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
  installButton,
  featureKey,
  apiKeysLink,
}: StepProps & {
  index: number
  length: number
  scratch: boolean
  installButton?: boolean
  featureKey?: string
  apiKeysLink?: boolean
}) {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div className="relative mb-10">
      <div
        className={classNames(
          "absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"
        )}
      ></div>
      <div className="relative flex">
        <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
          {index + 1}
        </div>
        <h3 className="text-lg font-semibold lg:text-2xl">
          <Title text={title} />{" "}
        </h3>
      </div>
      {description && (
        <div className="py-2 text-base">
          {typeof description == "string" ? (
            <Title text={description} />
          ) : (
            description
          )}
        </div>
      )}
      {apiKeysLink && (
        <div className="mt-2">
          Go to <BucketAPILink /> to get your API keys and add them to a{" "}
          {wrapWithSpan(`\`.env.local\``)} file.
        </div>
      )}
      {installButton && (
        <>
          <Button onClick={() => setShowModal(true)}>Install Block</Button>
        </>
      )}
      {!installButton && code && <Markdown>{dedent(code)}</Markdown>}
      {showModal && (
        <InstallDialog featureKey={featureKey} setShowModal={setShowModal} />
      )}
    </div>
  )
}

function CodeSteps(props: CodeStepsProps) {
  const {
    preview,
    step1 = ["npx create-next-app@latest cosmic-app", "cd cosmic-app"],
    steps,
    scratch = false,
    title,
    featureKey,
  } = props

  const searchParams = useSearchParams()
  const manager = useMemo(() => searchParams.get("pm"), [searchParams])

  const pm = (manager || "bun") as PackageManager

  const [newProjectStep, setNewProjectStep] = useState<string[]>(step1)
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

      const runStepUpdated = dedent(`\`\`\`bash
      ${managers[pm || "bun"]["run"]} dev
      \`\`\`
    `)

      setNewProjectStep(step1Updated)
      setRunStep(runStepUpdated)
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
                0
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Install a new Next.js project
              </h3>
            </div>
            <div className="py-2">
              Note: Be sure to include TypeScript and Tailwind CSS in the
              installation options.
            </div>
            {(newProjectStep || step1)?.map((step) => (
              <Markdown>
                {dedent(`\`\`\`bash
          ${step}
          \`\`\`
          `)}
              </Markdown>
            ))}
          </div>
        </div>
      )}
      {steps.map((step, index) => (
        <Step
          scratch={scratch}
          key={index}
          index={index}
          length={steps.length}
          featureKey={featureKey}
          {...step}
        />
      ))}
      {!scratch && (
        <div>
          <div className="relative mb-10">
            <div className="absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"></div>
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 1}
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">Run the app</h3>
            </div>
            <Markdown>{runStep}</Markdown>
          </div>
          <div className="relative mb-10">
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 3}
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
