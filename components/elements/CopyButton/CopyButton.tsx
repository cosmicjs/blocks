import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import cx from 'classnames';
import { useRef, useState } from 'react';

type CopyButtonProps = {
  text: string;
  btnText?: string;
  className?: string;
  iconOnly?: boolean;
  customIcon?: JSX.Element;
  iconPosition?: 'left' | 'right';
};

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  btnText,
  className,
  iconOnly,
  customIcon,
  iconPosition = 'right',
}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timer | null>(null);

  const onClick = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      aria-label="Copy button"
      className={cx(
        'flex items-center justify-center rounded bg-dark-background py-1 font-inter text-xs dark:bg-dark-background lg:py-[6px]',
        'border border-dark-gray-200 text-gray-300 transition duration-200 ease-linear',
        iconOnly ? 'w-[34px]' : 'w-[90px]',
        iconPosition === 'left' && 'flex-row-reverse',
        className
      )}
      onClick={onClick}
    >
      {!iconOnly && (
        <span className="mr-1">{copied ? 'Copied!' : btnText ?? 'Copy'}</span>
      )}
      {customIcon ? (
        customIcon
      ) : copied ? (
        <ClipboardDocumentCheckIcon className="h-4 w-4 text-green-300" />
      ) : (
        <ClipboardDocumentIcon className="h-4 w-4" />
      )}
    </button>
  );
};

export default CopyButton;
