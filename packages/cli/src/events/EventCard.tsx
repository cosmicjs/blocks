import Link from "next/link"
import { cn, getFormattedDateFromString } from "@/cosmic/utils"
import { Calendar, Clock, Pin } from "lucide-react"

export type EventCardType = {
  title: string
  slug: string
  metadata: {
    description: string
    location: string
    start_date: string
    start_time: string
    end_date: string
    end_time: string
    image: {
      imgix_url: string
    }
  }
}

export function EventCard({
  event,
  className,
}: {
  event: EventCardType
  className?: string
}) {
  return (
    <Link
      className={cn("group relative mb-auto w-full", className)}
      href={`/events/${event.slug}`}
    >
      <div className="w-full overflow-hidden group-hover:opacity-75">
        <img
          className="aspect-square h-full w-full rounded-xl border border-zinc-100 object-cover object-center dark:border-zinc-800 lg:h-full lg:w-full"
          src={`${event.metadata.image.imgix_url}?w=1000&h=1000&auto=format,compression`}
          alt={event.title}
        />
      </div>
      <div className="mt-4">
        <div className="text-lg font-medium leading-tight text-zinc-700 dark:text-zinc-300">
          {event.title}
        </div>
        <div className="flex h-full flex-col space-y-4 font-medium">
          <div
            className="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: event.metadata.description }}
          />
          <div className="flex h-full flex-col justify-end space-y-1">
            <div className="flex items-center space-x-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>
                {getFormattedDateFromString(event.metadata.start_date)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Clock className="mr-1 h-4 w-4 shrink-0" />
              <span>From</span>
              <span>{event.metadata.start_time}</span>
              <span>until</span>
              {event.metadata.start_date !== event.metadata.end_date && (
                <span>
                  {getFormattedDateFromString(event.metadata.end_date)}
                </span>
              )}
              <span>{event.metadata.end_time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Pin className="h-4 w-4 shrink-0" />
              <span>{event.metadata.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
