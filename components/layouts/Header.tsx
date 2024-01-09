import React from "react"
import { Button } from "../ui/button"
import classNames from "classnames"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"
import { DEMO_URL, WEBSITE_URL } from "@/constants"
import { cosmicSourceBucketConfig } from "@/lib/cosmic"

const Header: React.FC = async () => {
  const { object: page } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "landing-pages",
      slug: "home",
    })
    .props("title,metadata")
    .depth(1)
  return (
    <div className="dark:dark-header-image min-w-screen light-header-image container mx-auto mb-48 px-5">
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
          <h1 className="header-gradient relative z-10 mb-4 mt-28 w-full text-5xl font-[900] text-transparent md:mt-24 md:text-8xl lg:mt-28">
            {page.metadata.headline}
          </h1>
          <div
            className="m-auto max-w-[629px] text-center text-lg md:text-2xl"
            dangerouslySetInnerHTML={{ __html: page?.metadata?.tag }}
          />
          <div className="relative z-30 m-auto mt-8 flex flex-col justify-center space-y-4 md:max-w-[629px] md:flex-wrap md:space-x-4 lg:mt-14">
            <Button href="#get-started" className="px-7">
              Get started
            </Button>
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
        </div>
      </div>
    </div>
  )
}
export default Header
