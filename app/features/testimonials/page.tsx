/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { fetchFeature } from "@/lib/cosmic"
import { BucketAPILink } from "@/components/bucket-api-link"
import { Markdown } from "@/components/elements/Markdown/Markdown"
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
    <figure className="mb-6 overflow-hidden rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0">
      <img
        className="mx-auto h-24 w-24 rounded-full object-cover md:h-auto md:w-48 md:rounded-none"
        src={`${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3`}
        alt={testimonial.title}
      />
      <div className="space-y-4 text-center md:p-8 md:text-left">
        <blockquote className="relative">
          <p className="relative z-10 text-lg font-medium">
            &quot;{testimonial.metadata.quote}&quot;
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400">
            {testimonial.title}
          </div>
          <div className="text-slate-700 dark:text-slate-500">
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
      title: "Add the following to any page that needs testimonials.",
      code: dedent(`\`\`\`jsx
        // app/page.tsx
        import { Testimonials } from "@/cosmic/blocks/testimonials/Testimonials";
        
        export default function Home() {
          return (
            <main className="container">
              {/* page content above */}
              <Testimonials query={{ type: "testimonials" }}/>
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
