"use client"

import React, { useMemo, useState } from "react"
import { Markdown } from "../elements/Markdown/Markdown"
import dedent from "dedent"
import { useSearchParams } from "next/navigation"
import classNames from "classnames"
import { Button } from "@/components/ui/button"
import { InstallDialog } from "@/components/InstallDialog"
import { managers } from "../elements/CodeBlock/CodeBlock"
import Link from "next/link"

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

export function wrapWithSpan(text: string) {
  return text?.split("`")?.map((item, index) => {
    if (index % 2 === 0) return item
    return (
      <span
        key={item}
        className="bg-gray-100 px-1 py-px font-mono dark:bg-dark-gray-100"
      >
        {item}
      </span>
    )
  })
}

export const Highlight = ({ text }: { text: string }) => {
  return wrapWithSpan(text)
}

function Step({
  title,
  description,
  code,
  index,
  installButton,
  featureKey,
}: StepProps & {
  index: number
  length: number
  scratch: boolean
  installButton?: boolean
  featureKey?: string
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
          <Highlight text={title} />{" "}
        </h3>
      </div>
      {description && (
        <div className="py-2 text-base">
          {typeof description == "string" ? (
            <Highlight text={description} />
          ) : (
            description
          )}
        </div>
      )}
      {installButton && (
        <>
          <Button onClick={() => setShowModal(true)}>
            Install Block content
          </Button>
        </>
      )}
      {!installButton && code && <Markdown>{code}</Markdown>}
      {showModal && (
        <InstallDialog featureKey={featureKey} setShowModal={setShowModal} />
      )}
    </div>
  )
}

export function CodeSteps(props: CodeStepsProps) {
  const { preview, steps, scratch = false, featureKey } = props

  const searchParams = useSearchParams()
  const manager = useMemo(() => searchParams.get("pm"), [searchParams])

  const pm = manager || "bun"

  return (
    <div className="w-auto max-w-[60vw] whitespace-pre-line pt-8 lg:max-w-[750px]">
      <div className="mb-12">
        Follow the steps to install this Block. Make sure you have already
        followed the{" "}
        <Link href="/#get-started" className="text-cosmic-blue">
          Get Started
        </Link>{" "}
        steps to set up your project codebase and Cosmic access keys.
      </div>
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
            <div className="absolute left-[-42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200" />
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 1}
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">Run the app</h3>
            </div>
            <Markdown>
              {dedent(`\`\`\`bash
    ${managers[pm || "bun"]["run"]} dev
    \`\`\`
  `)}
            </Markdown>
          </div>
          <div className="relative mb-10">
            <div className="relative flex">
              <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
                {steps.length + 2}
              </div>
              <h3 className="text-lg font-semibold lg:text-2xl">
                Open http://localhost:3000 and go to any page where this
                component has been added. It should look like this:
              </h3>
            </div>
          </div>
          {preview && <div>{preview}</div>}
        </div>
      )}
    </div>
  )
}
