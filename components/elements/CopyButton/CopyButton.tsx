import cx from "classnames"
import { useRef, useState } from "react"
import { Copy, CopyCheck } from "lucide-react"

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

  const onClick = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setCopied(false), 1500)
  }

  return (
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
        // <ClipboardDocumentCheckIcon  />
        <Copy className="h-5 w-5" />
      )}
    </button>
  )
}

export default CopyButton
