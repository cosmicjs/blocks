import { cn } from "@/cosmic/utils"

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
    <div
      className={cn(
        "relative mb-6 justify-start overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0",
        className
      )}
    >
      <img
        className="mx-auto h-auto w-[260px] rounded-full object-cover md:rounded-none"
        src={`${event.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`}
        alt={event.title}
      />
      <div className="w-full space-y-4 text-center md:p-8 md:text-left">
        <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
          {event.title}
        </div>
        <div
          className="relative z-10 text-lg font-medium text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: event.metadata.description }}
        />
        <div className="absolute bottom-4 font-medium">
          <div className="mb-2 text-slate-700 dark:text-slate-300">
            📆{" "}
            {new Date(event.metadata.start_date).toLocaleDateString("en-us", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            {event.metadata.start_time} -{" "}
            {new Date(event.metadata.end_date).toLocaleDateString("en-us", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            {event.metadata.end_time}
          </div>
          <div className="text-slate-700 dark:text-slate-300">
            📍 {event.metadata.location}
          </div>
        </div>
      </div>
    </div>
  )
}
