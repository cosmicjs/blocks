"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Button } from "./ui/button"
import APIKeysDialog from "./APIKeysDialog"
import { BucketAPILink } from "./BucketAPILink"
import { wrapWithSpan } from "./layouts/CodeSteps"
import CopyButton from "./elements/CopyButton/CopyButton"
import { Markdown } from "./elements/Markdown/Markdown"
import classNames from "classnames"
import dedent from "dedent"
import { hideMiddleOfString } from "@/lib/utils"

const ENVKeys: React.FC = () => {
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

  const Modal = useMemo(
    () => (
      <APIKeysDialog
        onClose={() => setOpenKeysModal(false)}
        onSave={(bucketSlug, readKey, writeKey) => {
          setBucketSlug(bucketSlug)
          setReadKey(readKey)
          setWriteKey(writeKey)
        }}
      />
    ),
    []
  )

  return (
    <div className="relative pb-8">
      <div className="absolute left-[-42px] top-7 h-[95%] w-px bg-gray-200 dark:bg-dark-gray-200" />
      <div className="relative flex">
        <div className="absolute -left-14 top-px z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-mono dark:bg-dark-gray-200">
          2
        </div>
        <h3 className="text-lg font-semibold lg:text-2xl">
          Get and save your API keys as environment variables
        </h3>
      </div>
      {!hasKeysConfigured && (
        <>
          <Button
            onClick={() => setOpenKeysModal(true)}
            className="absolute inset-0 top-[40%] z-10 m-auto w-fit sm:top-[18%]"
          >
            Add API Keys
          </Button>
        </>
      )}
      {openKeysModal && Modal}
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
            text={`# .env.local
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
          {dedent(`\`\`\`# .env.local
COSMIC_BUCKET_SLUG=${bucketSlug}
COSMIC_READ_KEY=${hideMiddleOfString(readKey)}
COSMIC_WRITE_KEY=${hideMiddleOfString(writeKey)}
\`\`\`
`)}
        </Markdown>
      </div>
    </div>
  )
}
export default ENVKeys
