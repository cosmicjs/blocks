import { cosmic } from "@/cosmic/client"
import { TeamCard, MemberType } from "./TeamCard"

export async function TeamList({
  query,
  sort,
  limit,
  skip,
  className,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
}) {
  const { objects: members } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 0)
    .skip(skip ? skip : 0)
  return (
    <div className={className}>
      {members.map((member: MemberType) => {
        return <TeamCard key={member.slug} member={member} />
      })}
    </div>
  )
}
