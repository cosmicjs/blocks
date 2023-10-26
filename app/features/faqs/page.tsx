/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BucketAPILink } from "@/components/bucket-api-link"
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
      <div className="m-auto mt-10 w-full">
        <h2 className="mb-4 text-2xl font-semibold">
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
    const componentCodeString = dedent`
      \`\`\`jsx
      // components/faqs.tsx
      import {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
      } from "@/components/ui/accordion";
      
      type FAQ = {
        question: string;
        answer: string;
      };
      
      export async function FAQs({ faqs }: { faqs: FAQ[] }) {
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq: FAQ) => {
              return (
                <Accordion type="single" collapsible key={faq.question}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </>
        );
      }      
      \`\`\`
      `
    const codeString = dedent`
      \`\`\`jsx
      // app/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import { FAQs } from "@/components/faqs";
      
      export default async function Home() {
        
        const { object: page } = await cosmic.objects
          .findOne({
            type: "pages",
            slug: "home",
          })
          .props("slug,title,metadata")
          .depth(1)
        
        return (
          <main className="container">
            {/* page content above */}
            <FAQs faqs={page.metadata.faqs} />
            {/* page content below */}
          </main>
        );
      }    
      \`\`\`
      `
    return (
      <div className="pt-6">
        <div className="mb-6">
          The following code example uses Next.js, Tailwind CSS, and the Cosmic
          JavaScript SDK. Feel free to skip any steps that have already been
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
            Step 2. Add the Cosmic JavaScript SDK and Shandcn UI packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            bunx shadcn-ui@latest init
            \`\`\`
          `)}
          </Markdown>
          <Markdown>
            {dedent(`\`\`\`bash
            bunx shadcn-ui@latest add accordion
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
            your Bucket API keys found in <BucketAPILink />.
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
            Step 4. Create a new file located at `components/faqs.tsx` with the
            following
          </h3>
          <Markdown>{componentCodeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add the FAQs component to any file that needs FAQs
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 5. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 5. Go to http://localhost:3000 and any page where the FAQs have
            been added. It should look like this:
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
      <SiteHeader tab={tab} featureKey="faqs" />
      <section className="max-w-2000 container m-auto grid items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}
