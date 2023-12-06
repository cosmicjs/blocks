/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CodeSteps from "@/components/layouts/CodeSteps"

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

  return (
    <>
      <section className="container m-auto grid max-w-[800px] items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

type FAQ = {
  question: string
  answer: string
}

async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { object: faqs } = await cosmic.objects
    .findOne({
      type: "faqs",
      slug: "faqs",
    })
    .props("metadata")
    .depth(1)

  return (
    <div className="m-auto mt-10 w-full md:min-w-[1000px]">
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
              {page.metadata.faqs && ( // check if exists
                <FAQs faqs={page.metadata.faqs} />
              )}
              {/* page content below */}
            </main>
          );
        }    
      \`\`\`
      `

  const steps = [
    {
      title:
        " Create a new file located at `components/faqs.tsx` with the following",
      code: componentCodeString,
    },
    {
      title: "Add the FAQs component to any file that needs FAQs",
      code: codeString,
    },
  ]

  return (
    <>
      <CodeSteps
        step2={[
          "bun add @cosmicjs/sdk",
          "npx shadcn-ui@latest init",
          "npx shadcn-ui@latest add accordion",
        ]}
        steps={steps}
        preview={<Preview />}
      />
    </>
  )
}
