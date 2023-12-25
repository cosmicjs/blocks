import { cosmic } from "@/cosmic/client"
import { TeamCard, MemberType } from "./TeamCard"

export async function TeamGrid({
  query,
  sort,
  limit,
  skip,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
}) {
  const { objects: members } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort)
    .limit(limit)
    .skip(skip)
  return members.map((member: MemberType) => {
    return <TeamCard key={member.slug} member={member} />
  })
}
