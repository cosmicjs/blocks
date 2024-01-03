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

export function selectRandomValuesFromArray(arr: any[], limit: number) {
  const result = []
  const copyArr = arr.slice()
  for (let i = 0; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * copyArr.length)
    result.push(copyArr[randomIndex])
    copyArr.splice(randomIndex, 1)
  }
  return result
}

export function pluralize(singular: string, count: number) {
  return count > 1 ? `${singular}s` : singular
}

export function generateNumberFromString(inputString: string) {
  let hash = 0

  if (inputString.length === 0) {
    return hash
  }

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32-bit integer
  }

  return hash
}
