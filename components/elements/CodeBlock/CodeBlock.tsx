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

type Managers = {
  [key: string]: {
    install: string
    run: string
    executable: string
  }
}

export const managers: Managers = {
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

  return String(command).replace(/\n$/, "")
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
  const manager = searchParams.get("pm") || "bun"

  const hasPackageManager =
    typeof children === "string" &&
    packageManagers.some(
      (pm) => children.includes(pm.value) || children.includes("npx")
    )

  useEffect(() => {
    const code = hasPackageManager
      ? replacePackageManagerCommand(children, manager as PackageManager)
      : children
    setValue(code)
  }, [manager])

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
    </>
  )
}

export default CodeBlock
