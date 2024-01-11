"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { DASHBOARD_URL } from "@/constants"
import { ExternalLinkIcon } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { BucketAPILink } from "./BucketAPILink"

type APIKeysDialogProps = {
  onSave?: (bucketSlug: string, readKey: string, writeKey: string) => void
  open: boolean
  onClose: () => void
}

const APIKeysDialog: React.FC<APIKeysDialogProps> = ({
  onClose,
  onSave,
  open,
}) => {
  const [bucketSlug, setBucketSlug] = useState("")
  const [readKey, setReadKey] = useState("")
  const [writeKey, setWriteKey] = useState("")

  useEffect(() => {
    const bucketSlug = localStorage.getItem("bucket_slug") || ""
    const readKey = localStorage.getItem("read_key") || ""
    const writeKey = localStorage.getItem("write_key") || ""
    setBucketSlug(bucketSlug)
    setReadKey(readKey)
    setWriteKey(writeKey)
  }, [])

  const localStorageSlug =
    typeof window !== "undefined" && localStorage.getItem("bucket_slug")

  const hasKeysConfigured = !!localStorageSlug

  const APIKeyInputs = [
    {
      id: "bucket-slug",
      label: "Bucket Slug",
      onChange: (input: string) => setBucketSlug(input),
      value: bucketSlug,
    },
    {
      id: "read-key",
      label: "Read Key",
      onChange: (input: string) => setReadKey(input),
      value: readKey,
    },
    {
      id: "write-key",
      label: "Write Key",
      onChange: (input: string) => setWriteKey(input),
      value: writeKey,
    },
  ]

  const saveKeys = () => {
    localStorage.setItem("bucket_slug", bucketSlug)
    localStorage.setItem("read_key", readKey)
    localStorage.setItem("write_key", writeKey)
    onSave?.(bucketSlug, readKey, writeKey)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => onClose()}
        onEscapeKeyDown={() => onClose()}
      >
        <DialogHeader>
          <DialogTitle>
            {hasKeysConfigured
              ? "API Keys configured"
              : "Please enter your keys"}
          </DialogTitle>
          <DialogDescription>
            {!hasKeysConfigured && (
              <div>
                Fetch your API keys from <BucketAPILink />
                in the dashboard and add them to the following fields. You only
                need to do this setup once.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          {APIKeyInputs.map(({ id, label, onChange, value }) => (
            <div className="mb-2 flex items-center justify-between" key={id}>
              <Label htmlFor={id} className="w-fit shrink-0">
                {label}
              </Label>
              <Input
                id={id}
                placeholder={`Paste your ${label} here`}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                className="w-[272px]"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            disabled={!bucketSlug || !readKey || !writeKey}
            onClick={saveKeys}
            className={cn(buttonVariants())}
          >
            Save & proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default APIKeysDialog
