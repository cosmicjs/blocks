"use client"

import React from "react"
import { Button } from "../ui/button"
import { useTheme } from "next-themes"
import classNames from "classnames"

const Header: React.FC = () => {
  const { resolvedTheme: theme } = useTheme()

  return (
    <div className="container mx-auto lg:h-[631px]">
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
        <img
          src={`/assets/header/blocks-${
            theme === "dark" ? "dark" : "light"
          }.png`}
          alt="blocks illustration"
          className="absolute right-5 top-4 z-20 mx-auto w-[400px] scale-[2] md:inset-0 md:scale-100 lg:inset-auto lg:-top-36 lg:right-[-410px] lg:w-[90%]"
        />
      </div>
      <img
        src={`/assets/header/gradient-${
          theme === "dark" ? "dark" : "light"
        }.png`}
        alt="gradient"
        className="absolute -right-56 -top-60 z-20 mx-auto hidden lg:block"
      />
      <img
        src={`/assets/header/background-${
          theme === "dark" ? "dark" : "light"
        }.png`}
        alt="blocks background"
        className={classNames(
          "w-inherit absolute inset-0 top-10 z-0 mx-auto w-screen max-w-[1950px] scale-[1.25] overflow-hidden lg:-top-14 lg:block",
          {
            "opacity-20": theme === "dark",
          }
        )}
      />
    </div>
  )
}
export default Header
