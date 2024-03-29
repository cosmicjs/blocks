import { useState, useEffect } from "react"
import { Switch } from "@headlessui/react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const [isInsideIFrame, setIsInsideIFrame] = useState(false)

  useEffect(() => {
    const iframe = window.self !== window.top
    setIsInsideIFrame(iframe)
  }, [])

  const isLightTheme = theme === "light"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isInsideIFrame) {
    return <div className="h-5 w-5" />
  }

  const changeTheme = (isLightMode: boolean) => {
    if (isLightMode) setTheme("light")
    else setTheme("dark")
  }

  return (
    <div className="relative h-5 w-5">
      <Switch
        checked={isLightTheme}
        onChange={changeTheme}
        className="focus-visible:ring-opacity relative inline-flex shrink-0 cursor-pointer rounded-full focus:outline-none  focus-visible:ring-2 focus-visible:ring-black/75 dark:focus-visible:ring-white"
      >
        <span className="sr-only">Theme switcher</span>
        {isLightTheme ? (
          <SunIcon className="h-5 w-5 text-gray-900" />
        ) : (
          <MoonIcon className="h-5 w-5 text-white" />
        )}
      </Switch>
    </div>
  )
}

export default ThemeSwitch
