import React from "react"

export default function Logo({ className }: { className?: string }) {
  return (
    <>
    <div className="block dark:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="./logo-light.png" alt="Cosmic" className={className} />
    </div>
    <div className="hidden dark:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="./logo-dark.png" alt="Cosmic" className={className} />
    </div>
    </>
  )
}
