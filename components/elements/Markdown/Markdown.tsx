"use client"

import "./style.css"
import React, { useCallback, useEffect, useState } from "react"
import {
  ReactMarkdown,
  ReactMarkdownOptions,
} from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"
import remarkSlug from "remark-slug"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import CodeBlock from "@/components/elements/CodeBlock/CodeBlock"
import { VideoProps } from "@/components/elements/Markdown/markdown.types"
import { packageManagers } from "@/app/features/layout"
import classNames from "classnames"

export const Markdown = (props: ReactMarkdownOptions) => {
  const { className, children, ...restProps } = props

  const [value, setValue] = useState(children)

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

  const components: object = {
    img: (image: { src: string; alt: string }) => {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img loading="lazy" {...image} />
    },

    video: (props: VideoProps) => {
      const {
        width,
        height,
        controls,
        autoPlay,
        muted,
        playsInline,
        loop,
        poster,
        preload,
      } = props
      const sourceEl = props.node.children[1]
      const { src, type } = sourceEl.properties
      return (
        <video
          width={width}
          height={height}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          playsInline={playsInline}
          loop={loop}
          poster={poster}
          preload={preload}
          className="my-4 h-auto w-full rounded-lg lg:my-6"
        >
          <source src={src} type={type} />
        </video>
      )
    },

    a: (a: { href: string; children: string }) => {
      return a.href.charAt(0) === "#" ? (
        <a href={a.href}>{a.children}</a>
      ) : (
        <a href={a.href} rel="noopener noreferrer" target="_blank">
          {a.children}
        </a>
      )
    },

    code({
      node,
      inline,
      className,
      children,
    }: {
      node: object
      inline: boolean
      className: string
      children: React.ReactNode
    }) {
      return (
        <>
          {hasPackageManager && (
            <div className="relative top-2 flex w-fit items-end">
              {packageManagers.map((pm) => (
                <button
                  key={pm.value}
                  onClick={() =>
                    router.push(
                      pathname + "?" + createQueryString("pm", pm.value)
                    )
                  }
                  className={classNames(
                    "duration-[50] w-fit rounded-t-lg border border-gray-800 px-3 pb-2 text-sm transition-all ease-linear",
                    {
                      "h-[42px] bg-gray-800 text-gray-50": manager === pm.value,
                      "h-10 text-gray-400": manager !== pm.value,
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
              "w-full overflow-x-auto break-words rounded-lg bg-gray-800 px-2 py-2",
              {
                "px-5": inline,
              }
            )}
          >
            <CodeBlock node={node} inline={inline} className={className}>
              {children || ""}
            </CodeBlock>
          </div>
        </>
      )
    },
  }

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, remarkSlug]}
      className={`markdown min-w-[260px] text-gray-900 dark:text-dark-gray-700 ${className}`}
      {...restProps}
    >
      {value}
    </ReactMarkdown>
  )
}
