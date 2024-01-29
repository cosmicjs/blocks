import { cosmic } from "@/cosmic/client"
import { TeamCard, MemberType } from "./TeamCard"

function TeamMembers({ members }: { members: MemberType[] }) {
  return (
    <>
      {members.map((member: MemberType) => {
        return <TeamCard key={member.slug} member={member} />
      })}
    </>
  )
}

export async function TeamList({
  query,
  sort,
  limit,
  skip,
  className,
  status,
  noWrap = false,
}: {
  query: any
  sort?: string
  limit?: number
  skip?: number
  className?: string
  status?: "draft" | "published" | "any"
  noWrap?: boolean
}) {
  const { objects: members } = await cosmic.objects
    .find(query)
    .props("id,slug,title,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  if (noWrap) return <TeamMembers members={members} />
  return (
    <div
      className={`m-auto grid max-w-[900px] grid-cols-1 gap-6 px-4 lg:grid-cols-2 ${className}`}
    >
      <TeamMembers members={members} />
    </div>
  )
}
