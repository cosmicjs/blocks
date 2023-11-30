import React from "react"
import { Button } from "../ui/button"
import classNames from "classnames"
import { ThemedImage } from "../elements/ThemedImage/ThemedImage"

const Header: React.FC = () => {
  return (
    <div className="dark:dark-header-image light-header-image container mx-auto px-5 lg:h-[631px]">
      <div className="relative flex w-full flex-col-reverse items-center lg:flex-row">
        <div className="lg:w-[80%]">
          <h1 className="header-gradient relative z-10 mb-4 mt-56 text-center text-5xl font-[900] text-transparent md:mt-72 lg:mt-28 lg:text-left lg:text-8xl">
            Build Faster
          </h1>
          <p className="max-w-[629px] text-center text-lg lg:text-left lg:text-2xl">
            Beautifully designed, data-infused components to help you build web
            applications faster.
          </p>
          <div className="relative z-30 mt-8 flex justify-center space-x-4 lg:mt-14 lg:justify-start">
            <Button href="#features">Browse Blocks</Button>
            <Button variant="outline">Explore the Demo</Button>
          </div>
        </div>
        <ThemedImage
          darkSrc="/assets/header/blocks-dark.png"
          lightSrc="/assets/header/blocks-light.png"
          alt="blocks illustration"
          className="absolute right-5 top-4 z-20 mx-auto w-[400px] scale-[2] md:inset-0 md:scale-100 lg:inset-auto lg:-top-36 lg:right-[-410px] lg:w-[90%]"
        />
      </div>
      <ThemedImage
        darkSrc="/assets/header/gradient-dark.png"
        lightSrc="/assets/header/gradient-light.png"
        alt="gradient"
        className="absolute -top-40 right-0 z-20 mx-auto hidden w-[60%] lg:block"
      />
      <ThemedImage
        darkSrc="/assets/header/background-dark.png"
        lightSrc="/assets/header/background-light.png"
        alt="blocks background"
        className={classNames(
          "absolute inset-0 top-10 z-0 mx-auto w-screen max-w-[1750px] object-cover dark:mix-blend-overlay lg:-top-14 lg:block"
        )}
      />
    </div>
  )
}
export default Header
