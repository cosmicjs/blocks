/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { PackageManagers } from "../layout"
import CodeSteps from "@/components/layouts/CodeSteps"

export default async function Testimonials({
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

type Testimonial = {
  title: string
  slug: string
  metadata: {
    company: string
    position: string
    quote: string
    image: {
      imgix_url: string
    }
  }
}

function Testimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="mb-6 flex flex-col gap-4 overflow-hidden rounded-xl bg-zinc-100 p-8 dark:bg-zinc-800 md:flex-row md:p-0">
      <img
        className="mx-auto h-24 w-24 rounded-full object-cover md:h-auto md:w-48 md:rounded-none"
        src={`${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`}
        alt={testimonial.title}
      />
      <div className="space-y-4 text-center md:p-8 md:text-left">
        <blockquote className="relative">
          <p className="relative z-10 text-lg text-zinc-600 dark:text-zinc-300">
            &quot;{testimonial.metadata.quote}&quot;
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            {testimonial.title}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400">
            {testimonial.metadata.position}, {testimonial.metadata.company}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

async function Preview() {
  const testimonials = await fetchFeature<Testimonial>("testimonials")

  return (
    <div className="py-10">
      {testimonials?.map((testimonial: Testimonial) => {
        return <Testimonial testimonial={testimonial} key={testimonial.slug} />
      })}
    </div>
  )
}

function Code({ manager }: { manager: PackageManagers }) {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add testimonials
  \`\`\`
  `

  const importCode = dedent`
  \`\`\`jsx
  import { Testimonials } from "@/cosmic/blocks/testimonials/Testimonials";
  \`\`\`
  `

  const usageCode = dedent`
  \`\`\`jsx
  <Testimonials query={{ type: "testimonials" }}/>
  \`\`\`
  `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `testimonials` Object type to your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the `Testimonial.tsx` and `Testimonials.tsx` files to `cosmic/blocks/testimonials`.",
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
  ]

  return (
    <CodeSteps steps={steps} preview={<Preview />} featureKey="testimonials" />
  )
}
