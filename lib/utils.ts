import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getMediaBlobFromURL(url: string, name: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const media: any = new Blob([blob], {
    type: "image/jpeg",
  })
  media.name = name
  return media
}
