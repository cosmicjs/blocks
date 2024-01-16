// Add a tooltip to show "Copied" after successful copying

import React, { useRef, useState } from "react"
import { Copy, CopyCheck } from "lucide-react"
import cx from "classnames"
import classNames from "classnames"

type CopyButtonProps = {
  text: string
  btnText?: string
  className?: string
  iconOnly?: boolean
  customIcon?: JSX.Element
  iconPosition?: "left" | "right"
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  btnText,
  className,
  iconOnly,
  customIcon,
  iconPosition = "right",
}) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<NodeJS.Timer | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const onClick = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setCopied(false), 1500)
  }

  return (
    <div className="relative overflow-visible">
      <button
        type="button"
        aria-label="Copy button"
        className={cx(
          "font-inter flex items-center justify-center rounded bg-dark-background py-1 text-xs dark:bg-dark-background lg:py-[6px]",
          "border border-dark-gray-200 text-gray-300 transition duration-200 ease-linear",
          iconOnly ? "w-[34px]" : "w-[90px]",
          iconPosition === "left" && "flex-row-reverse",
          className
        )}
        onClick={onClick}
      >
        {!iconOnly && (
          <span className="mr-1">{copied ? "Copied!" : btnText ?? "Copy"}</span>
        )}
        {customIcon ? (
          customIcon
        ) : copied ? (
          <CopyCheck className="h-5 w-5 text-green-300" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
        <div
          ref={tooltipRef}
          className={classNames(
            "absolute -top-3 left-0 z-[99999] w-max -translate-x-1/4 -translate-y-full transform rounded border border-gray-300 bg-gray-200 px-2 py-1 text-xs text-black transition-opacity duration-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
            {
              "opacity-100": copied,
              "pointer-events-none opacity-0": !copied,
            }
          )}
        >
          Copied!
        </div>
      </button>
    </div>
  )
}

export default CopyButton
