import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getMediaBlogFromURL(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const media: any = new Blob([blob], {
    type: "image/jpeg",
  })
  media.name = getImageNameFromURL(url)
  return media
}

export function getImageNameFromURL(name: string) {
  return name.split('https://imgix.cosmicjs.com/')[1]
}