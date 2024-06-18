"use client"

import React, { useMemo, useState } from "react"
import { Markdown } from "../elements/Markdown/Markdown"
import { useSearchParams } from "next/navigation"
import classNames from "classnames"
import { Button } from "@/components/ui/button"
import { InstallDialog } from "@/components/InstallDialog"
import Link from "next/link"
import { LinkIcon } from "lucide-react"
import slugify from "@sindresorhus/slugify"

type StepProps = {
  title: string
  description?: string | React.ReactNode
  code?: string
}

type CodeStepsProps = {
  title?: React.ReactNode
  step1?: string[]
  step2?: string[]
  steps: StepProps[]
  scratch?: boolean
  writeKey?: boolean
  featureKey?: string
  description?: React.ReactNode
}

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
  scratch,
}: StepProps & {
  index: number
  length: number
  scratch: boolean
  installButton?: boolean
  featureKey?: string
}) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const slug = slugify(title)
  return (
    <div className="relative mb-10">
      <div id={`${slug}-${index + 1}`} className="absolute -top-24"></div>
      {!scratch && (
        <div
          className={classNames(
            "absolute -left-[42px] top-7 h-[110%] w-px bg-gray-200 dark:bg-dark-gray-200"
          )}
        ></div>
      )}
      <div className="relative flex">
        {!scratch && (
          <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
            {index + 1}
          </div>
        )}
        <h3 className="text-lg font-semibold lg:text-2xl">
          <Link href={`#${slug}-${index + 1}`} className="flex">
            <Highlight text={title} />{" "}
            <LinkIcon className="ml-2 mt-2 h-4 w-4 text-gray-500" />
          </Link>
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
  const { steps, scratch = false, featureKey, description = "" } = props

  const searchParams = useSearchParams()
  const manager = useMemo(() => searchParams.get("pm"), [searchParams])

  const pm = manager || "bun"

  return (
    <div className="w-auto max-w-[60vw] whitespace-pre-line pt-8 lg:max-w-[750px]">
      {description && (
        <div className="mb-4">
          <h4 className="mb-2 mt-4 text-lg font-semibold">Description</h4>
          {description}
        </div>
      )}
      {!scratch && (
        <div className="mb-12">
          Follow the steps below to install this Block. Make sure you have
          reviewed the{" "}
          <Link href="/#get-started" className="text-cosmic-blue">
            getting started
          </Link>{" "}
          steps.
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
    </div>
  )
}
