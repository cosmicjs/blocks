// app/events/[slug]/page.tsx
import { cosmic } from "@/cosmic/client"
import Link from "next/link"
import { Button } from "@/cosmic/elements/Button"
import { cn, getFormattedDate } from "@/cosmic/utils"
import { notFound } from "next/navigation"

export async function SingleEvent({
  query,
  className,
  status,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  try {
    const { object: event } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .status(status ? status : "published")

    return (
      <section className={cn("m-auto pb-8 md:container", className)}>
        <div className="relative m-auto max-w-[950px]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol role="list" className="flex space-x-2">
              <li>
                <div className="flex items-center">
                  <Link
                    href="/events"
                    className="mr-2 text-sm font-medium text-zinc-900 dark:text-white"
                  >
                    Events
                  </Link>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm font-medium text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-300">
                {event.title}
              </li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 md:gap-x-8">
            <div>
              <img
                className="aspect-square h-full w-full rounded-xl border border-zinc-100 object-cover object-center dark:border-zinc-800 lg:h-full lg:w-full"
                src={`${event.metadata.image.imgix_url}?w=2000&h=2000&auto=format,compression`}
                alt={event.title}
              />
            </div>
            <div>
              <h1 className="mb-2 mt-6 text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 md:mb-4 md:mt-0 md:text-4xl">
                {event.title}
              </h1>
              <div className="mb-8">
                <Button type="submit">Get tickets</Button>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Date and Time
              </h3>
              <div className="flex items-center space-x-1 text-sm text-zinc-900 dark:text-gray-300">
                <span>{getFormattedDate(event.metadata.start_date)}</span>
                <span>from</span>
                <span>{event.metadata.start_time}</span>
                <span>until</span>
                {event.metadata.start_date !== event.metadata.end_date && (
                  <span>{getFormattedDate(event.metadata.end_date)}</span>
                )}
                <span>{event.metadata.end_time}</span>
              </div>
              <h3 className="mb-2 mt-6 text-lg font-medium text-gray-900 dark:text-white">
                Details
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: event.metadata.description,
                }}
                className="mb-6 text-sm text-gray-700 dark:text-gray-300"
              />
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Location
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: event.metadata.location,
                  }}
                  className="mb-6 text-sm text-gray-700 dark:text-gray-300"
                />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Agenda
                </h3>
                <div className="mb-6 text-sm text-gray-700 dark:text-white">
                  <ul className="flex flex-col gap-4">
                    {event.metadata.agenda.map((item: any) => (
                      <li
                        key={item.item}
                        className="flex flex-col space-y-1 rounded-lg bg-gray-50 px-3 py-2 dark:bg-zinc-800"
                      >
                        <span className="text-xs text-orange-600 dark:text-orange-400">
                          {item.time}
                        </span>
                        <span className="font-medium">{item.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (e: any) {
    if (e.status === 404) return notFound()
  }
}
