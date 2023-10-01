"use client"

import "./style.css"
import React from "react"
import {
  ReactMarkdown,
  ReactMarkdownOptions,
} from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"
import remarkSlug from "remark-slug"

import CodeBlock from "@/components/elements/CodeBlock/CodeBlock"
import { VideoProps } from "@/components/elements/Markdown/markdown.types"

export const Markdown = (props: ReactMarkdownOptions) => {
  const { className, ...restProps } = props

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
        <CodeBlock node={node} inline={inline} className={className}>
          {children}
        </CodeBlock>
      )
    },
  }

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, remarkSlug]}
      className={`markdown text-gray-900 dark:text-dark-gray-700 ${className}`}
      {...restProps}
    />
  )
}
