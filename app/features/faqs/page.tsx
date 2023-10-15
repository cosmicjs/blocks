/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"

export async function generateMetadata() {
  return {
    title: `FAQs`,
  }
}

export default async function FAQs({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { object: faqs } = await cosmic.objects
    .findOne({
      type: "faqs",
      slug: "faqs",
    })
    .props("metadata")
    .depth(1)
  type FAQ = {
    question: string
    answer: string
  }
  function Preview() {
    return (
      <div className="w-full m-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        {faqs.metadata.faqs.map((faq: FAQ) => {
          return (
            <Accordion type="single" collapsible key={faq.question}>
              <AccordionItem value="item-1">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>
    )
  }
  function Code() {
    const codeString = dedent`
      \`\`\`jsx
      import { cosmic } from "@/lib/cosmic";
      
      import {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
      } from "@/components/ui/accordion"

      export default async function FAQs() {
        
        // Set the type and slug to the page that contains the FAQs
        const { object: page } = await cosmic.objects
          .findOne({
            type: "pages",
            slug: "home",
          })
          .props("metadata")
          .depth(1)
        
        type FAQ = {
          question: string
          answer: string
        }
        
        return (
          <div className="max-w-[700px] m-auto my-20">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            {page.metadata.faqs.map((faq: FAQ) => {
              return (
                <Accordion type="single" collapsible key={faq.question}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
        );
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
            Step 2. Add the Cosmic JavaScript SDK and Shandcn UI Accordion
            packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            yarn add @cosmicjs/sdk
            npx shadcn-ui@latest init
            npx shadcn-ui@latest add accordion
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
            Step 4. Add the following to any file that needs FAQs
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 5. Run your app</h3>
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
