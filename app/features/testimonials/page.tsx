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
      <figure className="mb-6 md:flex bg-slate-100 overflow-hidden rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img
          className="w-24 h-24 object-cover md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          src={`${testimonial.metadata.image.imgix_url}?w=2000&h=2000&auto=format,compression&fit=facearea&facepad=3`}
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
      import { cosmic } from "@/lib/cosmic";
      
      export default async function Tesimonials() {
        
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
                src={\`\${testimonial.metadata.image.imgix_url}?w=2000&h=2000&auto=format,compression&fit=facearea&facepad=3\`}
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
          <div className="py-10">
            {testimonials.map((testimonial: Testimonial) => {
              return <Testimonial testimonial={testimonial} />
            })}
          </div>
        )
      }
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK.
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
            npx create-next-app@latest cosmic-app
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
            yarn add @cosmicjs/sdk
            yarn add react-markdown
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
            Step 4. Add the following to any file that needs testimonials.
          </h3>
          <div className="py-2">
            Note: You will need to swap `BUCKET_SLUG` and `BUCKET_READ_KEY` with
            your Bucket API keys found in Bucket {`>`} Setting {`>`} API keys.
          </div>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 4. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            yarn dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 and any page where this global
            settings data has been added. It should look like this:
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
      <SiteHeader tab={tab} />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
