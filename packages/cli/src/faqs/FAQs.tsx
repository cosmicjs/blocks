// components/faqs.tsx
import { cosmic } from "@/cosmic/client"
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

export async function FAQs({
  query,
  className,
  status,
}: {
  query: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  const { object: page } = await cosmic.objects
    .findOne(query)
    .props("id,title,metadata.faqs")
    .depth(1)
    .status(status ? status : "published")
  return (
    <div className={`m-auto max-w-[800px] p-4 ${className}`}>
      {!page?.metadata?.faqs?.length ? (
        <div className="rounded-xl border border-orange-400 p-6 text-center text-orange-400">
          No FAQs added to the {page.title} Object yet.{" "}
          <a
            href={`https://app.cosmicjs.com/${process.env.COSMIC_BUCKET_SLUG}/objects/${page.id}`}
            className="text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            Add FAQs ↗
          </a>
        </div>
      ) : (
        (page?.metadata?.faqs).map((faq: FAQ) => {
          return (
            <Accordion type="single" collapsible key={faq.question}>
              <AccordionItem value="item-1">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })
      )}
    </div>
  )
}
