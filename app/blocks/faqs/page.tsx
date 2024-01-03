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
  const blockCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add faqs
    \`\`\`
    `
  const importCode = dedent`
    \`\`\`jsx
    import { FAQs } from "@/cosmic/blocks/faqs/FAQs";
    \`\`\`
    `
  const usageCode = dedent`
    \`\`\`jsx
    <FAQs query={{ slug: "home", type: "pages" }} />
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      description:
        "This will add the `faqs` repeater Metafield to the Object type(s) of your choice.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the files `Accordion.tsx` and `FAQs.tsx` to your blocks folder located in `cosmic/blocks/faqs`.",
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
    <>
      <CodeSteps steps={steps} preview={<Preview />} featureKey="faqs" />
    </>
  )
}
