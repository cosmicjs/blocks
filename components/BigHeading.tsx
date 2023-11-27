import classNames from "classnames"
import React from "react"

type BigHeadingProps = {
  subheading?: string
  heading: string
  description?: string
  className?: string;
  id?: string;
}

const BigHeading: React.FC<BigHeadingProps> = ({
  heading,
  subheading,
  description,
  className,
  id
}) => {
  return (
    <div id={id} className={classNames("mx-auto text-center", className)}>
      {subheading && (
        <h4 className="text-gray-400 dark:text-gray-400 text-3xl font-extrabold uppercase tracking-wider">{subheading}</h4>
      )}
      <h2 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-dark-purple-gradient to-cosmic-bright-blue mt-2 mb-4">
        {heading}
      </h2>
      {description && (
        <p className="max-w-[540px] mx-auto">{description}</p>
      )}
    </div>
  )
}
export default BigHeading
