// components/faqs.tsx
import { cosmic } from "@/cosmic/config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion"

type FAQ = {
  question: string
  answer: string
}

export async function FAQs({ faqs }: { faqs?: FAQ[] }) {
  const { object: page } = await cosmic.objects
    .findOne({
      type: "pages",
      slug: "home",
    })
    .props("slug,title,metadata")
    .depth(1)

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">
        Frequently Asked Questions
      </h2>
      {(faqs || page?.metadata?.faqs).map((faq: FAQ) => {
        return (
          <Accordion type="single" collapsible key={faq.question}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </>
  )
}
