import { type NextRequest } from "next/server"
import { createBucketClient } from "@cosmicjs/sdk"

const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_SOURCE_BUCKET_SLUG || "",
  readKey: process.env.NEXT_PUBLIC_SOURCE_READ_KEY || "",
  writeKey: process.env.NEXT_SOURCE_WRITE_KEY || "",
})

export async function POST(request: NextRequest) {
  const res = await request.json()
  const data = await cosmic.objects.insertOne(res.comment)
  return data
}
