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

export function hideMiddleOfString(input: string): string {
  if (!input) return input
  if (input.length <= 26) {
    // If the string has 6 or fewer characters, don't hide anything
    return input
  }

  const firstThree = input.slice(0, 8)
  const lastThree = input.slice(-8)
  const middleHidden = "x".repeat(input.length - 10) // Number of 'X' equals the length of middle part to be hidden

  return firstThree + middleHidden + lastThree
}
