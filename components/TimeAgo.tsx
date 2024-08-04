"use client"

import { timeAgo } from "@/lib/utils"

export function TimeAgo({ time }: { time: string }) {
  return <>{timeAgo(time)}</>
}
