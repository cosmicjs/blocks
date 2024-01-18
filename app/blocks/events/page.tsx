/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { PackageManagers } from "../layout"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { EventCard, EventCardType } from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import { PreviewCopy } from "@/components/PreviewCopy"

export async function generateMetadata() {
  return {
    title: `Events`,
  }
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
    pm?: PackageManagers
  }
}) {
  let tab = searchParams.tab || "preview"
  let pm = searchParams.pm || "bun"

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code manager={pm} />}
      </section>
    </>
  )
}

async function Preview() {
  const events = await fetchFeature<EventCardType>("events")
  const event = events[0]
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Events List
      </h1>
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 flex-col gap-5 pb-24 sm:grid-cols-2 lg:gap-10">
          {events?.map((event: EventCardType) => {
            return <EventCard event={event} key={event.slug} />
          })}
        </div>
      </div>
      <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
        <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Single Event Page
        </h1>
        <section className="m-auto pb-8 md:container">
          <div className="relative m-auto max-w-[950px]">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol role="list" className="flex space-x-2">
                <li>
                  <div className="flex items-center">
                    <div className="mr-2 text-sm font-medium text-zinc-900 dark:text-white">
                      Events
                    </div>
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
                  <span>
                    {new Date(event.metadata.start_date).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <span>from</span>
                  <span>{event.metadata.start_time}</span>
                  <span>until</span>
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
                      {event?.metadata?.agenda.map((item: any) => (
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
      </div>
    </div>
  )
}

function Code({ manager }: { manager: PackageManagers }) {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add events
  \`\`\`
  `

  const importCode = dedent`
    \`\`\`jsx
    import { EventsList } from "@/cosmic/blocks/events/EventsList";
    import { SingleEvent } from "@/cosmic/blocks/events/SingleEvent";
    \`\`\`
    `

  const usageCode = dedent`
    \`\`\`jsx
    <EventsList query={{ type: "events" }} />
    <SingleEvent query={{ type: "events", slug: "event-slug" }} />
    \`\`\`
    `
  const exampleListCode = dedent`
    \`\`\`jsx
    // app/events/page.tsx
    import { EventsList } from "@/cosmic/blocks/events/EventsList";
    export default async function EventListPage() {
      return (
        <EventsList
          className="max-w-[900px] mt-8 m-auto grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
          query={{ type: "events" }}
        />
      );
    }    
    \`\`\`
    `
  const exampleSingleCode = dedent`
    \`\`\`jsx
    // app/events/[slug]/page.tsx
    import { SingleEvent } from "@/cosmic/blocks/events/SingleEvent";
    export default async function SingleEventPage({
      params,
    }: {
      params: { slug: string };
    }) {
      return (
        <SingleEvent
          className="max-w-[900px] mt-8"
          query={{ slug: params.slug, type: "events" }}
        />
      );
    }    
    \`\`\`
    `
  const draftPreviewCode = dedent`
    \`\`\`jsx
    // app/events/[slug]/page.tsx
    import { SingleEvent } from "@/cosmic/blocks/events/SingleEvent";
    export default async function SingleEventPage({
      params,
      searchParams,
    }: {
      params: { slug: string };
      searchParams?: any;
    }) {
      return (
        <SingleEvent
          className="max-w-[900px] mt-8"
          query={{ slug: params.slug, type: "events" }}
          status={searchParams.status}
        />
      );
    }
    \`\`\`
    `
  const localizationCode = dedent`
    \`\`\`jsx
    // app/[locale]/events/page.tsx
    import { EventsList } from "@/cosmic/blocks/events/EventsList";
    export default async function EventListPage({
      params,
    }: {
      params: { locale: string };
    }) {
      return (
        <EventsList
          className="max-w-[900px] mt-8 m-auto grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
          query={{ type: "events", locale: params.locale }}
        />
      );
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      description: "This will add the `events` Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the `EventCard.tsx`, `EventsList.tsx`, and `SingleEvent.tsx` files to `cosmic/blocks/events`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description:
        "Import the `EventsList` and/or `SingleEvent` Block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description:
        "Add the block to your app with the `query` property set to fetch your specific content.",
    },
  ]
  const examples = [
    {
      title: "Events page",
      code: exampleListCode,
      description:
        "Add a new file located at `app/events/page.tsx` with the following:",
    },
    {
      title: "Single event page",
      code: exampleSingleCode,
      description:
        "Add a new file located at `app/events/[slug]/page.tsx` with the following:",
    },
    {
      title: "Draft preview",
      description:
        "Enable draft preview by setting the `status` property on the Block. View the draft preview content by setting the `?status=any` in the URL. Note: This is a basic example. It is advisable to consider a security strategy if you intend to keep your preview private.",
      code: draftPreviewCode,
    },
    {
      title: "Draft preview link in the dashboard",
      description:
        "To add the draft preview link in the dashboard, go to Events Object type > Settings and add your preview link in the dashboard under Additional Settings. For example adding the link `http://localhost:3000/events/[object_slug]?status=any` will add a Preview button to each event.",
    },
    {
      title: "Localization",
      code: localizationCode,
      description:
        "First, enable localization in the dashboard by going to Events Object type > Settings under Additional Settings. Then set the locale on your specific Object. Finally, pass the `locale` parameter into the query to fetch your localized content. Then go to any page with localization set, for example: `https://localhost:3000/es/events` or `https://localhost:3000/en/events`.",
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="events" />
      <div className="mb-2 border-t pt-10">
        <h3 className="text-3xl font-semibold">Examples</h3>
      </div>
      <CodeSteps scratch steps={examples} featureKey="events" />
    </>
  )
}
