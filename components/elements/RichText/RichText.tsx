"use client"

import React, { useEffect } from "react"
import classNames from "classnames"
import DOMPurify from "isomorphic-dompurify"

import "./style.css"

type RichText = {
  content: string
}

const RichText: React.FC<RichText> = ({ content }) => {
  // Embedly used for adding links with dynamic preview cards to YouTube, GitHub, etc.
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.embedly.com/widgets/platform.js"
    script.async = true
    script.crossOrigin = "anonymous"
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className={classNames(
        "rich-text text-gray-900 dark:text-dark-gray-900 [&>pre]:text-white"
      )}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        }),
      }}
    />
  )
}
export default RichText
