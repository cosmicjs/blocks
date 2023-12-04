import { ReactNode, useEffect, useState } from "react"
import classNames from "classnames"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"

import "@/components/elements/CodeBlock/cosmic-code-theme.css"
import CopyButton from "@/components/elements/CopyButton/CopyButton"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("astro", jsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("css", css)

const CodeBlock = ({
  node,
  inline,
  codeClassName,
  className,
  children,
  showCopy = true,
  ...props
}: {
  node?: object
  inline?: boolean
  className?: string
  codeClassName?: string
  children: ReactNode
  showCopy?: boolean
}) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null
  const match = /language-(\w+)/.exec(className || "")
  const data = String(children).replace(/\n$/, "")
  return (
    <>
      {!inline ? (
        <div className="relative">
          {showCopy && (
            <div className="absolute right-2 top-1 z-10">
              <CopyButton text={data} className="!bg-gray-800" iconOnly />
            </div>
          )}
          <SyntaxHighlighter
            language={match?.[1] || "javascript"}
            className={classNames(
              "cosmic-code-theme !my-0 overflow-x-auto rounded-md !bg-gray-800 px-3 py-2 shadow",
              codeClassName
            )}
            wrapLines={false}
            wrapLongLines={false}
            PreTag="div"
            {...props}
          >
            {data}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="rounded bg-gray-200 px-1 py-px dark:bg-dark-gray-200">
          {data}
        </code>
      )}
    </>
  )
}

export default CodeBlock
