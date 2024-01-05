import classNames from "classnames"

type ThemedImageProps = {
  darkSrc: string
  lightSrc: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function ThemedImage({
  darkSrc,
  lightSrc,
  alt,
  className,
  width,
  height,
}: ThemedImageProps) {
  return (
    <>
      <img
        width={width ?? 400}
        height={height ?? 400}
        src={lightSrc}
        className={classNames("block dark:hidden", className)}
        alt={alt}
      />
      <img
        width={width ?? 400}
        height={height ?? 400}
        src={darkSrc}
        className={classNames("hidden dark:block", className)}
        alt={alt}
      />
    </>
  )
}
