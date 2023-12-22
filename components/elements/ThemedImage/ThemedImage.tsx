"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemedImageProps = {
  darkSrc: string
  lightSrc: string
  alt: string
  className?: string
}

export function ThemedImage({
  darkSrc,
  lightSrc,
  alt,
  className,
}: ThemedImageProps) {
  const { resolvedTheme: theme } = useTheme()
  const [imageSrc, setImageSrc] = useState(darkSrc)

  useEffect(() => {
    setImageSrc(theme === "dark" ? darkSrc : lightSrc)
  }, [theme, darkSrc, lightSrc])

  return (
    <img
      width={400}
      height={400}
      src={imageSrc || darkSrc}
      className={className}
      alt={alt}
    />
  )
}
