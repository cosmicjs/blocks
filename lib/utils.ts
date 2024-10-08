import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getMediaBlobFromURL(
  url: string,
  name: string,
  isVideo?: boolean
) {
  const response = await fetch(
    url + (!isVideo ? "?w=2000&auto=compression,format" : "")
  )
  const blob = await response.blob()
  const media: any = new Blob([blob], {
    type: isVideo ? "video/mp4" : "image/jpeg",
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

function getFormattedDate(
  date: Date,
  prefomattedDate?: "Today" | "Yesterday" | false,
  hideYear?: boolean
) {
  const date_number = date.getDate()
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
  const day = days[date.getDay()]
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  let hours = date.getHours()
  let am_pm = "am"
  if (hours > 11) {
    am_pm = "pm"
    if (hours > 12) hours = hours - 12
  }
  if (hours === 0) {
    hours = 12
  }
  let minutes: number | string = date.getMinutes()
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = "0" + minutes
  }
  if (prefomattedDate)
    return prefomattedDate + " at " + hours + ":" + minutes + am_pm
  if (hideYear) {
    // 10. January at 10:20
    return (
      day +
      ", " +
      month +
      " " +
      date_number +
      " at " +
      hours +
      ":" +
      minutes +
      am_pm
    )
  }
  // 10. January 2017. at 10:20
  return (
    day +
    ", " +
    month +
    " " +
    date_number +
    ", " +
    year +
    " at " +
    hours +
    ":" +
    minutes +
    am_pm
  )
}

export function timeAgo(dateParam?: number | string | Date) {
  if (!dateParam) {
    return null
  }
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam)
  const DAY_IN_MS = 86400000 // 24 * 60 * 60 * 1000
  const today = new Date()
  const yesterday = new Date(today.getTime() - DAY_IN_MS)
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000)
  const minutes = Math.round(seconds / 60)
  const isToday = today.toDateString() === date.toDateString()
  const isYesterday = yesterday.toDateString() === date.toDateString()
  const isThisYear = today.getFullYear() === date.getFullYear()
  if (seconds < 5) {
    return "Just now"
  } else if (seconds < 60) {
    return seconds + " seconds ago"
  } else if (seconds < 90) {
    return "about a minute ago"
  } else if (minutes < 60) {
    return minutes + " minutes ago"
  } else if (isToday) {
    return getFormattedDate(date, "Today") // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday") // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true) // 10. January at 10:20
  }
  return getFormattedDate(date) // 10. January 2017. at 10:20
}
