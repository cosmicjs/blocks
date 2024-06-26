/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { uploadAllFiles } from "@/cosmic/blocks/file-upload/actions"
import { Button } from "@/cosmic/elements/Button"
import { Check, Loader2, XIcon, LoaderCircleIcon } from "lucide-react"

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
  maxSize,
  autoUpload,
  accept,
  maxFiles,
}: {
  className?: string
  onComplete: (response: {
    error?: boolean
    success?: boolean
    media?: FileType[]
  }) => void
  maxSize?: number
  autoUpload?: boolean
  accept?: any
  maxFiles?: number
}) {
  const [filesInQueue, setFilesInQueue] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFilesInQueue([...acceptedFiles, ...filesInQueue])
    },
    [filesInQueue]
  )
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize,
      accept,
      maxFiles,
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

  // Auto upload
  if (autoUpload && filesInQueue.length && !uploading && !uploadSuccess)
    handleSubmit()

  async function handleSubmit() {
    setUploading(true)
    setUploadError(false)
    setUploadSuccess(false)
    let formData = new FormData()
    filesInQueue.map((file: File) => {
      formData.append("files", file, file.name)
    })
    try {
      const uploadResponse = await uploadAllFiles(formData)
      onComplete(uploadResponse)
      setUploading(false)
      if (uploadResponse.error) {
        setUploadError(true)
      } else {
        setUploadSuccess(true)
      }
    } catch (e) {
      console.log(e)
      alert(e)
    }
    setFilesInQueue([])
    setTimeout(() => setUploadSuccess(false), 3000)
  }
  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`mb-4 cursor-pointer rounded-xl border-2 border-dashed ${
          isDragActive
            ? "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
            : ""
        } p-20 text-center`}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      {!uploadSuccess && !autoUpload && files.length ? (
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
      {autoUpload && uploading && (
        <div className="p-10">
          <LoaderCircleIcon className="m-auto h-10 w-10 animate-spin" />
        </div>
      )}
      {uploadSuccess ? (
        <div className="mb-4 flex rounded-xl border border-green-600 p-4 text-green-600 dark:border-green-400 dark:text-green-400">
          <Check className="relative top-1 mr-4 h-4 w-4 shrink-0 text-green-500" />{" "}
          Upload success!
        </div>
      ) : (
        ""
      )}
      {uploadError ? (
        <div className="mb-4 flex rounded-xl border border-red-600 p-4 text-red-600 dark:border-red-400 dark:text-red-400">
          <XIcon className="relative top-1 mr-4 h-4 w-4 shrink-0 text-red-500" />{" "}
          Upload error!
        </div>
      ) : (
        ""
      )}
      {fileRejections.length ? (
        <div className="my-4 flex rounded-xl border border-red-600 p-4 text-red-600 dark:border-red-400 dark:text-red-400">
          <XIcon className="relative top-1 mr-4 h-4 w-4 shrink-0 text-red-500" />{" "}
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
