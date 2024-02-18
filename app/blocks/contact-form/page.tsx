/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"
import Link from "next/link"

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
  const installResend = dedent`
  \`\`\`bash
  bun add resend
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
    // app/page.tsx
    import { Hero } from "@/cosmic/blocks/landing-page/Hero";
    import { Sections } from "@/cosmic/blocks/landing-page/Sections";
    import { ContactForm } from "@/cosmic/blocks/contact-form/ContactForm";
    export default async function HomePage() {
      return (
        <>
          <Hero query={{ slug: "home", type: "pages" }} />
          <Sections query={{ slug: "home", type: "pages" }} />
          <ContactForm className="w-full max-w-[500px] m-auto" />
        </>
      );
    }
    \`\`\`
    `

  const submissionsAPICodeString = dedent`
    \`\`\`ts
    // app/api/submissions/route.ts
    import { type NextRequest } from "next/server";
    import { cosmic } from "@/cosmic/client";
    import { Resend } from "resend";
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "change_to_your_email@example.com";
    const resend = new Resend(RESEND_KEY);

    export async function POST(request: NextRequest) {
      const res = await request.json();
      const { metadata: metadata, title } = res.submission;
      const data = await cosmic.objects.insertOne(res.submission);
      const submitterSubject = \`Form submission received\`;
      const submitterHTML = \`
        Hello \${title},<br/><br/>
        This is a message to confirm that we have received your form submission with the following information:<br/><br/>
        Name: \${title}<br/>
        Email: \${metadata.email}<br/>
        Company: \${metadata.company}<br/>
        Message: \${metadata.message}<br/>
        <br/>
        A representative will be in touch with you soon.
      \`;
      // Send confirmation email
      await sendEmail({
        to: metadata.email,
        from: CONTACT_EMAIL,
        reply_to: CONTACT_EMAIL,
        subject: submitterSubject,
        html: submitterHTML,
      });
      const adminSubject = \`\${title} submitted the form\`;
      const adminHTML = \`
        \${title} submitted the contact form with the following information:<br/><br/>
        Name: \${title}<br/>
        Email: \${metadata.email}<br/>
        Company: \${metadata.company}<br/>
        Message: \${metadata.message}<br/>
      \`;
      // Send email to admin
      await sendEmail({
        to: CONTACT_EMAIL,
        from: CONTACT_EMAIL,
        reply_to: metadata.email,
        subject: adminSubject,
        html: adminHTML,
      });
      return Response.json(data);
    }

    export async function sendEmail({
      from,
      to,
      subject,
      html,
      reply_to,
    }: {
      from: string;
      to: string;
      subject: string;
      html: string;
      reply_to: string;
    }) {
      const data = await resend.emails.send({
        from,
        to,
        subject,
        html,
        reply_to,
      });
      return data;
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
        "This will add the `ContactForm.tsx` file and components to your blocks folder located in `cosmic/blocks/contact-form`.",
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
      title: "Install Resend email client",
      description: (
        <>
          We will use the Resend email service to send emails. Run the following
          command to install the Resend JavaScript client. Learn more about
          sending emails with Resend on the{" "}
          <a
            href="https://resend.com"
            target="_blank"
            className="text-cosmic-blue"
            rel="noreferrer"
          >
            Resend website
          </a>
          .
        </>
      ),
      code: installResend,
    },
    {
      title: "Add Resend key and contact email.",
      description:
        "Add the following additional keys to the existing `.env.local` file. Change the values to your Resend key and email that you would like to receive the form submissions.",
      code: dedent(`\`\`\`jsx
      // .env.local
      ...
      RESEND_API_KEY=re_123456
      CONTACT_EMAIL=youremail@domain.com
      \`\`\`
      `),
    },
    {
      title: "Create the form submissions post API route",
      description:
        "Create a new file at `app/api/submissions/route.ts` with the following:",
      code: submissionsAPICodeString,
    },
    {
      title: "Usage: Home page",
      code: exampleCode,
      description: (
        <>
          Add the following to the file `app/page.tsx`. Note: this assumes you
          have installed the{" "}
          <Link href="/blocks/blog" className="text-cosmic-blue">
            Landing Page Block
          </Link>
          .
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
