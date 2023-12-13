"use client"

import React from "react"
import { Button } from "../ui/button"
import classNames from "classnames"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"
import { DEMO_URL, WEBSITE_URL } from "@/constants"

const Header: React.FC = () => {
  return (
    <div className="dark:dark-header-image min-w-screen light-header-image container mx-auto px-5 lg:h-[631px]">
      <div className="relative flex w-full flex-col-reverse items-center lg:flex-row">
        <div className="lg:w-[50%]">
          <h1 className="header-gradient relative z-10 mb-4 mt-56 text-center text-5xl font-[900] text-transparent md:mt-72 lg:mt-28 lg:text-left lg:text-8xl">
            Build Faster
          </h1>
          <p className="max-w-[629px] text-center text-lg lg:text-left lg:text-2xl">
            Beautifully designed, data-infused components to help you build web
            applications faster.
          </p>
          <div className="relative z-30 mt-8 flex flex-wrap justify-center space-x-4 lg:mt-14 lg:justify-start">
            <Button href="#features">Browse Blocks</Button>
            <Button href={DEMO_URL} target="_blank" variant="outline">
              Explore the Demo
            </Button>
            <Button
              href={WEBSITE_URL}
              target="_blank"
              variant="ghost"
              className="text-cosmic-blue"
            >
              What is Cosmic?
            </Button>
          </div>
        </div>
        <div className="w-[50%]">
          <ThemedImage
            darkSrc="https://imgix.cosmicjs.com/b8597df0-9419-11ee-b62d-5b90a0a1bade-blocks-dark.png?w=1920&h=1080&auto=format"
            lightSrc="https://imgix.cosmicjs.com/b8a0e730-9419-11ee-b62d-5b90a0a1bade-blocks-light.png?w=1920&h=1080&auto=format"
            alt="blocks illustration"
            className="absolute -left-2 top-4 z-20 scale-[2] sm:left-auto sm:scale-100 md:-top-24 lg:relative lg:-right-[96px] lg:top-32 lg:w-full lg:scale-[1.8] 2xl:-right-[104px]"
          />
        </div>
      </div>
      <ThemedImage
        darkSrc="https://imgix.cosmicjs.com/b96bff60-9419-11ee-b62d-5b90a0a1bade-gradient-dark.png?w=1200&h=800&auto=format"
        lightSrc="https://imgix.cosmicjs.com/b976adc0-9419-11ee-b62d-5b90a0a1bade-gradient-light.png?w=1200&h=800&auto=format"
        alt="gradient"
        className="absolute -top-40 right-0 z-20 mx-auto hidden w-[60%] lg:block"
      />
      <ThemedImage
        darkSrc="https://imgix.cosmicjs.com/8e7e83d0-990b-11ee-b62d-5b90a0a1bade-blocks-dark.png?w=1200&h=800&q=75&auto=format"
        lightSrc="https://imgix.cosmicjs.com/8e683cb0-990b-11ee-b62d-5b90a0a1bade-blocks-light.png?w=1200&h=800&q=75&auto=format"
        alt="blocks background"
        className={classNames(
          "absolute inset-0 top-10 z-0 mx-auto w-screen max-w-[1750px] object-cover dark:mix-blend-overlay lg:-top-14 lg:block"
        )}
      />
    </div>
  )
}
export default Header