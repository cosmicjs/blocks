/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export default async function Testimonials({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
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
  function Preview() {
    return (
      <div className="py-10">
        {testimonials.map((testimonial: Testimonial) => {
          return <Testimonial testimonial={testimonial} />
        })}
      </div>
    )
  }
  function Code() {
    const codeString = dedent`
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
              return <Testimonial testimonial={testimonial} />
            })}
          </>
        )
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK. Feel free to ignore any steps that have already been
          completed.
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 1. Install a new Next.js project
          </h3>
          <div className="py-2">
            Note: Be sure to include TypeScript and Tailwind CSS in the
            installation options.
          </div>
          <Markdown>
            {dedent(`\`\`\`bash
            bunx create-next-app@latest cosmic-app
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            cd cosmic-app
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 3. Create a new file located at `lib/cosmic.ts` with the
            following
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
          <Markdown>
            {dedent(`\`\`\`ts
            // lib/cosmic.ts
            import { createBucketClient } from "@cosmicjs/sdk";
            export const cosmic = createBucketClient({
              bucketSlug: "BUCKET_SLUG",
              readKey: "BUCKET_READ_KEY",
            });
            \`\`\`
            `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 4. Create a new file at `components/testimonials.tsx` with the
            following
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add the following to any page that needs testimonials.
          </h3>
          <Markdown>
            {dedent(`\`\`\`jsx
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
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 and any page where this
            testimonial component has been added. It should look like this:
          </h3>
        </div>
        <div className="mb-6">
          <Preview />
        </div>
      </div>
    )
  }
  return (
    <>
      <SiteHeader tab={tab} featureKey="testimonials" />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
