import classNames from "classnames"
import React from "react"

type BigHeadingProps = {
  subheading?: string
  heading: string
  description?: string
  className?: string
  id?: string
}

const BigHeading: React.FC<BigHeadingProps> = ({
  heading,
  subheading,
  description,
  className,
  id,
}) => {
  return (
    <div id={id} className={classNames("mx-auto text-center", className)}>
      {subheading && (
        <h4 className="text-lg font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-400 md:text-3xl">
          {subheading}
        </h4>
      )}
      <h2 className="mb-4 mt-2 bg-gradient-to-r from-dark-purple-gradient to-cosmic-bright-blue bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl">
        {heading}
      </h2>
      {description && <p className="mx-auto max-w-[540px]">{description}</p>}
    </div>
  )
}
export default BigHeading
