/* eslint-disable @next/next/no-img-element */
"use client"

import { FileUpload } from "./FileUpload"

export function Form({ className }: { className?: string }) {
  return (
    <div className={className}>
      <FileUpload
        onComplete={(response) => {
          // Do something with the response here
        }}
        maxSize={1000000}
        className="mb-4 w-full min-w-[320px] md:w-[800px]"
      />
    </div>
  )
}
