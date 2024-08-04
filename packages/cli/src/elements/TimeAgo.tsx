"use client"

import { timeAgo } from "@/cosmic/utils"

export function TimeAgo({ time }: { time: string }) {
  return <>{timeAgo(time)}</>
}
