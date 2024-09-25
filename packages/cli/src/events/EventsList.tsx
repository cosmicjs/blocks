import { cosmic } from "@/cosmic/client"
import { EventCard, EventCardType } from "./EventCard"

function Events({ events }: { events: EventCardType[] }) {
  return (
    <>
      {events?.map((event: EventCardType) => {
        return <EventCard event={event} key={event.slug} />
      })}
    </>
  )
}

export async function EventsList({
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
  const { objects: events } = await cosmic.objects
    .find(query)
    .props("id,title,slug,metadata")
    .depth(1)
    .sort(sort ? sort : "-order")
    .limit(limit ? limit : 100)
    .skip(skip ? skip : 0)
    .status(status ? status : "published")
  if (noWrap) return <Events events={events} />
  return (
    <div
      className={`m-auto mt-8 grid max-w-[900px] grid-cols-1 place-items-center items-start gap-8 px-4 md:grid-cols-2 xl:grid-cols-2 ${className}`}
    >
      <Events events={events} />
    </div>
  )
}
