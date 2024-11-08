import React from "react"
import { DEMO_URL, EXTENSION_URL, WEBSITE_URL } from "@/constants"
import classNames from "classnames"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"

import { ThemedImage } from "../elements/ThemedImage/ThemedImage"
import { Button } from "../ui/button"

export default async function Header({
  isExtension,
}: {
  isExtension?: boolean
}) {
  const { object: page } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "landing-pages",
      slug: "home",
    })
    .props("title,metadata")
    .depth(1)
  return (
    <div className="dark:dark-header-image min-w-screen light-header-image md:mb-26 lg:mb-30 container mx-auto mb-16 px-5">
      <div className="opacity-50">
        <ThemedImage
          darkSrc="https://imgix.cosmicjs.com/b96bff60-9419-11ee-b62d-5b90a0a1bade-gradient-dark.png?w=1200&h=800&auto=format"
          lightSrc="https://imgix.cosmicjs.com/b976adc0-9419-11ee-b62d-5b90a0a1bade-gradient-light.png?w=1200&h=800&auto=format"
          alt="gradient"
          className="absolute -top-40 right-0 z-0 mx-auto hidden w-[80%] lg:block"
        />
        <ThemedImage
          darkSrc="https://imgix.cosmicjs.com/8e7e83d0-990b-11ee-b62d-5b90a0a1bade-blocks-dark.png?w=1200&h=800&q=75&auto=format"
          lightSrc="https://imgix.cosmicjs.com/8e683cb0-990b-11ee-b62d-5b90a0a1bade-blocks-light.png?w=1200&h=800&q=75&auto=format"
          alt="blocks background"
          className={classNames(
            "absolute inset-0 top-10 z-0 mx-auto w-screen max-w-[1750px] object-cover dark:opacity-20 dark:mix-blend-overlay lg:-top-14 lg:block"
          )}
        />
      </div>
      <div className="relative w-full text-center">
        <div className="z-10 text-center">
          <h1 className="header-gradient z-10 m-auto mb-4 mt-28 w-full max-w-[760px] text-5xl font-[900] text-transparent md:mt-24 md:text-8xl lg:mt-28">
            What will you build?
          </h1>
          <div className="m-auto max-w-[629px] text-center text-lg text-gray-600 dark:text-dark-gray-600 md:text-2xl">
            Pre-built components for website content, user management, contact
            forms, and more. Build your next project faster with Blocks.
          </div>
          <div className="relative z-30 m-auto mt-8 flex flex-col flex-wrap justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:mt-14 lg:space-y-0">
            <Button href="#get-started" className="px-7">
              Get started
            </Button>
            {!isExtension && (
              <Button
                href={EXTENSION_URL}
                target="_blank"
                variant="outline"
                className="px-7"
              >
                Install the extension
              </Button>
            )}
            <Button
              href={DEMO_URL}
              target="_blank"
              variant="outline"
              className="px-7"
            >
              Explore the demo
            </Button>
            <Button
              href={WEBSITE_URL}
              target="_blank"
              variant="ghost"
              className="border-none !bg-transparent text-cosmic-blue"
            >
              What is Cosmic?
            </Button>
          </div>
          <div className="my-10 flex items-center justify-center space-x-8 opacity-75 dark:opacity-50 md:space-x-12">
            {["next", "react", "tailwind", "typescript"].map((tech) => (
              <img
                key={tech}
                className="h-10 w-10 opacity-75 grayscale-[50%] lg:h-14 lg:w-14"
                src={`/assets/tech/${tech}.svg`}
                alt={tech}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
