/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { PackageManagers } from "../layout"
import CodeSteps from "@/components/layouts/CodeSteps"

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

type EventType = {
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

function Event({ event }: { event: EventType }) {
  return (
    <div className="relative mb-6 justify-start overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0">
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

async function Preview() {
  const events = await fetchFeature<EventType>("events")

  return (
    <div className="py-10">
      {events?.map((event: EventType) => {
        return <Event event={event} key={event.slug} />
      })}
    </div>
  )
}

function Code({ manager }: { manager: PackageManagers }) {
  const step4code = dedent`
    \`\`\`jsx
      // components/events.tsx
      import { cosmic } from "@/lib/cosmic";

      export async function Events() {
        
        const { objects: events } = await cosmic.objects
          .find({
            type: "events",
          })
          .props("title,slug,metadata")
          .depth(1)

        type EventType = {
          title: string
          slug: string
          metadata: {
            description: string
            start_date: string
            start_time: string
            end_date: string
            end_time: string
            image: {
              imgix_url: string
            }
          }
        }

        function Event({ event }: { event: EventType }) {
          return (
            <div className="relative mb-6 justify-start overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0">
              <img
                className="mx-auto h-auto w-[260px] rounded-full object-cover md:rounded-none"
                src={\`\${event.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3\`}
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
                  <div className="text-slate-700 dark:text-slate-300">
                    Starts {new Date(event.metadata.start_date).toLocaleDateString()},{" "}
                    {event.metadata.start_time}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Ends {new Date(event.metadata.end_date).toLocaleDateString()},{" "}
                    {event.metadata.end_time}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        return (
          <>
            {events?.map((event: EventType) => {
              return <Event event={event} key={event.slug} />
            })}
          </>
        )
      }
    \`\`\`
    `

  const steps = [
    {
      title: "Create a new file at `components/events.tsx` with the following",
      code: step4code,
    },
    {
      title: "Add the following to any page that needs events.",
      code: dedent(`\`\`\`jsx
            // app/page.tsx
            import { Events } from "@/components/events";
            
            export default function Home() {
              return (
                <main className="container">
                  {/* page content above */}
                  <Events />
                  {/* page content below */}
                </main>
              );
            }
      \`\`\`
      `),
    },
  ]

  return <CodeSteps steps={steps} preview={<Preview />} />
}
