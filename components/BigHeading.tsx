import classNames from "classnames"
import React from "react"

type BigHeadingProps = {
  subheading?: string
  heading: string
  description?: string
  className?: string
  scrollId?: string
}

const BigHeading: React.FC<BigHeadingProps> = ({
  heading,
  subheading,
  description,
  className,
  scrollId,
}) => {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 -top-28 z-20 h-2 bg-cosmic-blue/0"
        id={scrollId}
      />
      <div className={classNames("mx-auto text-center", className)}>
        {subheading && (
          <h4 className="text-lg font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-400 md:text-3xl">
            {subheading}
          </h4>
        )}
        <h2 className="mt-2 bg-gradient-to-r from-dark-purple-gradient to-cosmic-bright-blue bg-clip-text pb-4 text-3xl font-extrabold text-transparent md:text-5xl">
          {heading}
        </h2>
        {description && <p className="mx-auto max-w-[540px]">{description}</p>}
      </div>
    </div>
  )
}
export default BigHeading
