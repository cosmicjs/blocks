/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { PackageManagers } from "../layout"
import CodeSteps from "@/components/layouts/CodeSteps"
import { EventCard, EventCardType } from "@/components/event-card"

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

  return (
    <div className="py-10">
      {events?.map((event: EventCardType) => {
        return <EventCard event={event} key={event.slug} />
      })}
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
    \`\`\`
    `

  const usageCode = dedent`
    \`\`\`jsx
    <EventsList query={{ type: "events" }} />
    \`\`\`
    `
  const exampleCode = dedent`
    \`\`\`jsx
    // app/events/page.tsx
    import { EventsList } from "@/cosmic/blocks/events/EventsList";
    export default async function EventListPage() {
      return (
        <EventsList className="max-w-[900px] m-auto" query={{ type: "events" }} />
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
        "This will add the `EventCard.tsx` and `EventsList.tsx` files to `cosmic/blocks/events`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description:
        "Add the block to your app with the `query` property set to fetch your specific content.",
    },
    {
      title: "Example: events page",
      code: exampleCode,
      description:
        "Add a new file located at `app/events/page.tsx` with the following:",
    },
  ]

  return <CodeSteps steps={steps} preview={<Preview />} featureKey="events" />
}
