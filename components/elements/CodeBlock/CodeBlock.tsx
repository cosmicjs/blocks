"use client"

import { useCallback, useEffect, useState } from "react"
import classNames from "classnames"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css"
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript"
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown"
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import "@/components/elements/CodeBlock/cosmic-code-theme.css"
import CopyButton from "@/components/elements/CopyButton/CopyButton"
import { packageManagers } from "@/config/site"

SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("astro", jsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("css", css)

const executableCommands = {
  yarn: "npx",
  bun: "bunx",
  npm: "npx",
  pnpm: "npx",
}

type PackageManager = keyof typeof executableCommands

function replaceExecutableCommand(command: string, pm: PackageManager) {
  // Custom commands for creating a next app with different package managers, temporary implementation - needs to be improved.
  const customNextAppCommands = {
    yarn: "yarn create next-app cosmic-app && cd cosmic-app",
    bun: "bunx create-next-app@latest cosmic-app && cd cosmic-app",
    npm: "npx create-next-app@latest cosmic-app && cd cosmic-app",
    pnpm: "pnpm create next-app cosmic-app && cd cosmic-app",
  }

  // Check if the command contains 'next-app'
  if (command.includes("next-app")) {
    // Replace the whole command with the custom command for the selected package manager
    return customNextAppCommands[pm]
  } else {
    // Replace all occurrences of executable commands with the one for the selected package manager
    Object.entries(executableCommands).forEach(([key, executable]) => {
      if (command.includes(executable)) {
        const executableRegex = new RegExp(`\\b${executable}\\b`, "g")
        command = command.replace(executableRegex, executableCommands[pm])
      }
    })
    return command
  }
}

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
  children: string
  showCopy?: boolean
}) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const [value, setValue] = useState(children)

  const match = /language-(\w+)/.exec(className || "")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Check localStorage for a saved package manager value
  const savedManager =
    typeof window !== "undefined" ? localStorage.getItem("pm") : null
  const manager = searchParams.get("pm") || savedManager || "npm"

  useEffect(() => {
    // Save the current package manager to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("pm", manager)
    }
    // Replace executable commands if necessary
    const code = replaceExecutableCommand(children, manager as PackageManager)
    setValue(code)
  }, [manager, children])

  const hasPackageManager =
    typeof children === "string" &&
    packageManagers.some(
      (pm) => children.includes(pm.value) || children.includes("npx")
    )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  if (!hasMounted) return null

  return (
    <>
      {hasPackageManager && (
        <div className="relative top-2 flex w-fit items-end">
          {packageManagers.map((pm) => (
            <button
              key={pm.value}
              onClick={() =>
                router.push(
                  pathname + "?" + createQueryString("pm", pm.value),
                  {
                    scroll: false,
                  }
                )
              }
              className={classNames(
                "duration-[50] w-fit rounded-t-lg px-3 pb-2 text-sm transition-all ease-linear",
                {
                  "h-[42px] bg-gray-800 text-gray-50": manager === pm.value,
                  "h-10 text-gray-700 dark:text-gray-300": manager !== pm.value,
                }
              )}
            >
              {pm.title}
            </button>
          ))}
        </div>
      )}
      <div
        className={classNames(
          "w-full break-words rounded-lg bg-gray-800 px-2 py-2",
          {
            "px-5": inline,
          }
        )}
      >
        {!inline ? (
          <div className="relative">
            {showCopy && (
              <div className="absolute right-2 top-1 z-10">
                <CopyButton text={value} className="!bg-gray-800" iconOnly />
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
              {value}
            </SyntaxHighlighter>
          </div>
        ) : (
          <code className="overflow-x-auto rounded bg-gray-200 px-1 py-px dark:bg-dark-gray-200">
            {value}
          </code>
        )}
      </div>
      {value.includes("@cosmicjs/blocks add") &&
        (manager === "yarn" || manager === "pnpm") && (
          <span className="max-w-[80%] font-sans text-sm text-gray-500">
            Note: Only scripts will be executed using npx. All dependencies will
            be installed using {manager}&apos;s add command.
          </span>
        )}
    </>
  )
}

export default CodeBlock
