/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Check, Loader2, XIcon } from "lucide-react"

export type FileType = {
  id: string
  url: string
  type: string
  imgix_url: string
  name: string
}

export function FileUpload({
  className,
  onComplete,
  maxSize = 0,
}: {
  className?: string
  onComplete: (response: {
    error?: boolean
    success?: boolean
    media?: FileType[]
  }) => void
  maxSize: number
}) {
  const [filesInQueue, setFilesInQueue] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFilesInQueue([...acceptedFiles, ...filesInQueue])
    },
    [filesInQueue]
  )
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize: maxSize,
    })
  const files = filesInQueue.map((file: File) => (
    <li key={file.name} className="mb-4">
      {file.type.indexOf("image") !== -1 ? (
        <img
          className="h-44 w-60 rounded-xl bg-cover object-cover"
          src={`${URL.createObjectURL(file)}`}
          alt={file.name}
        />
      ) : (
        <span>{file.name}</span>
      )}
    </li>
  ))

  async function handleSubmit() {
    setUploading(true)
    setUploadSuccess(false)
    setTimeout(function () {
      setFilesInQueue([])
      setUploading(false)
      setUploadSuccess(true)
    }, 1500)
    setTimeout(function () {
      setUploadSuccess(false)
    }, 5000)
  }
  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className="mb-4 h-[190px] w-full cursor-pointer rounded-xl border-2 border-dashed p-20 text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag 'n' drop some files here, or click to select files (max size
            1MB)
          </p>
        )}
      </div>
      {!uploadSuccess && files.length ? (
        <>
          <h4 className="mb-4">Ready to upload</h4>
          <ul className="flex flex-wrap gap-4">{files}</ul>
          <Button onClick={handleSubmit} type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload files`
            )}
          </Button>
        </>
      ) : (
        ""
      )}
      {uploadSuccess ? (
        <div className="flex rounded-xl border border-green-600 p-4 text-green-600 dark:border-green-400 dark:text-green-400">
          <Check className="relative top-1 mr-4 h-4 w-4 text-green-500" />{" "}
          Upload success!
        </div>
      ) : (
        ""
      )}
      {fileRejections.length ? (
        <div className="mt-4 flex rounded-xl border border-red-600 p-4 text-red-600 dark:border-red-400 dark:text-red-400">
          <XIcon className="relative top-1 mr-4 h-4 w-4 text-red-500" />{" "}
          <div>
            {fileRejections.map(({ file, errors }) => {
              return (
                <div key={file.name}>
                  Error uploading {file.name}. Message: {errors[0].message}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
