import Link from "next/link"

export function PreviewCopy({ className }: { className?: string }) {
  return (
    <div className="mb-12">
      Preview the Block below, then follow the steps to{" "}
      <Link href="?tab=install" className="text-cosmic-blue">
        install this Block
      </Link>
      .
    </div>
  )
}
