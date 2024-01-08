import Link from "next/link"

export function PreviewCopy({ className }: { className?: string }) {
  return (
    <div className="mb-12">
      Preview the Block below, then follow the steps in the{" "}
      <Link href="?tab=code" className="text-cosmic-blue">
        code tab
      </Link>{" "}
      to install this Block.
    </div>
  )
}
