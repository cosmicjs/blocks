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
  const step4code = dedent`
    \`\`\`jsx
    // components/testimonials.tsx
    import { cosmic } from "@/lib/cosmic";
    
    export async function Testimonials() {
      
      const { objects: testimonials } = await cosmic.objects
        .find({
          type: "testimonials",
        })
        .props("title,slug,metadata")
        .depth(1)

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
          <figure className="mb-6 md:flex bg-slate-100 overflow-hidden rounded-xl p-8 md:p-0 dark:bg-slate-800">
            <img
              className="w-24 h-24 object-cover md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
              src={\`\${testimonial.metadata.image.imgix_url}?w=500&h=500&auto=format,compression&fit=facearea&facepad=3\`}
              alt={testimonial.title}
            />
            <div className="md:p-8 text-center md:text-left space-y-4">
              <blockquote className="relative">
                <p className="relative text-lg z-10 font-medium">
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
      
      return (
        <>
          {testimonials.map((testimonial: Testimonial) => {
            return <Testimonial testimonial={testimonial} key={testimonial.slug} />;
          })}
        </>
      )
    }
    \`\`\`
    `

  const steps = [
    {
      title:
        "Create a new file at `components/testimonials.tsx` with the following",
      code: step4code,
    },
    {
      title: "Add the following to any page that needs testimonials.",
      code: dedent(`\`\`\`jsx
          // app/page.tsx
          import { Testimonials } from "@/components/testimonials";
          
          export default function Home() {
            return (
              <main className="container">
                {/* page content above */}
                <Testimonials />
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
