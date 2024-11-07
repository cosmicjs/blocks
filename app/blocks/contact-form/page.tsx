/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import dedent from "dedent"

import { ContactForm } from "@/components/ContactForm"
import { CodeSteps } from "@/components/layouts/CodeSteps"
import { PreviewCopy } from "@/components/PreviewCopy"

export async function generateMetadata() {
  return {
    title: `Contact Form`,
  }
}

export default async function Testimonials({
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

async function Preview() {
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <PreviewCopy />
      <ContactForm className="w-full max-w-[500px]" />
    </div>
  )
}
function Code() {
  const blockCommand = dedent`
  \`\`\`bash
  bunx @cosmicjs/blocks add contact-form
  \`\`\`
  `

  const importCode = dedent`
    \`\`\`jsx
    import { ContactForm } from "@/cosmic/blocks/contact-form/ContactForm";
    \`\`\`
    `
  const usageCode = dedent`
    \`\`\`jsx
    <ContactForm className="w-full max-w-[500px] m-auto" />
    \`\`\`
    `
  const exampleCode = dedent`
    \`\`\`jsx
    // app/contact/page.tsx
    import { ContactForm } from "@/cosmic/blocks/contact-form/ContactForm";
    export default async function ContactPage() {
      return (
        <>
          <ContactForm className="w-full max-w-[500px] m-auto my-10" />
        </>
      );
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block content model",
      code: blockCommand,
      description:
        "This will create the `form-submissions` Object type in your Bucket.",
      installButton: true,
    },
    {
      title: "Install the Block code",
      code: blockCommand,
      description:
        "This will add the `ContactForm.tsx` and `actions.tsx` server actions file and components to your blocks folder located in `cosmic/blocks/contact-form`.",
    },
    {
      title: "Import Block",
      code: importCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: usageCode,
      description: "Add the block component.",
    },
    {
      title: "Add Resend key and contact email",
      description: (
        <>
          We will use the Resend email service to send emails (installed
          automatically). Learn more about sending emails with Resend on the{" "}
          <a
            href="https://resend.com"
            target="_blank"
            className="text-cosmic-blue"
            rel="noreferrer"
          >
            Resend website
          </a>
          . Add the following keys to the `.env.local` file. Change the values
          to your Resend key and email that you would like to receive the form
          submissions. Find your Resend API key in the{" "}
          <a
            href="https://resend.com/login"
            target="_blank"
            rel="noreferrer"
            className="text-cosmic-blue"
          >
            Resend dashboard
          </a>
          .
        </>
      ),
      code: dedent(`\`\`\`jsx
      // .env.local
      ...
      RESEND_API_KEY=re_123456
      CONTACT_EMAIL=youremail@domain.com
      \`\`\`
      `),
    },
    {
      title: "Usage: Contact page",
      code: exampleCode,
      description: (
        <>
          Create a new file at `app/contact/page.tsx` and add the following
          code. Then go to `http://localhost:3000/contact` to see the form.
        </>
      ),
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} writeKey featureKey="contact-form" />
    </>
  )
}
