/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import classNames from "classnames"
import dedent from "dedent"

import { CodeSteps } from "@/components/layouts/CodeSteps"
import { Form } from "@/components/file-upload/Form"

export async function generateMetadata() {
  return {
    title: `File Upload`,
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "install"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  return (
    <>
      <section
        className={classNames("container m-auto grid items-center pb-8", {
          "max-w-[800px]": tab !== "preview",
          "max-w-[1200px]": tab === "preview",
        })}
      >
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

async function Preview() {
  return (
    <div className="container m-auto grid items-center px-4 py-8">
      <section className="container m-auto grid items-center px-4 py-8">
        <Form />
      </section>
    </div>
  )
}

function Code() {
  const fileUploadCommand = dedent`
    \`\`\`bash
    bunx @cosmicjs/blocks add file-upload
    \`\`\`
    `
  const fileUploadImportCode = dedent`
    \`\`\`jsx
    import { FileUpload, FileType } from "@/cosmic/blocks/file-upload/FileUpload";
    \`\`\`
    `

  const fileUploadUsageCode = dedent`
    \`\`\`jsx
    <FileUpload
      onComplete={(response) => {
        // Do something with the response here
        if (response.media)
          setUploadedMedia([...response.media, ...uploadedMedia]);
      }}
    />
    \`\`\`
    `
  const fileUploadExampleCode = dedent`
    \`\`\`jsx
    /* eslint-disable @next/next/no-img-element */
    "use client";

    import { FileUpload, FileType } from "@/cosmic/blocks/file-upload/FileUpload";
    import { useState } from "react";

    // Show list of uploaded media
    function mediaList(file: FileType) {
      return (
        <li key={file.id} className="mb-4">
          <a href={file.url} target="_blank">
            {file.type.indexOf("image") !== -1 ? (
              <img
                className="w-60 h-44 object-cover bg-cover rounded-xl"
                src={\`\${file.imgix_url}?w=500&auto=format,compression\`}
                alt={file.name}
              />
            ) : (
              <span>{file.name}</span>
            )}
          </a>
        </li>
      );
    }

    export function Form({ className }: { className?: string }) {
      const [uploadedMedia, setUploadedMedia] = useState<FileType[]>([]);
      return (
        <div className={className}>
          <FileUpload
            onComplete={(response) => {
              // Do something with the response here
              if (response.media)
                setUploadedMedia([...response.media, ...uploadedMedia]);
            }}
            maxSize={1000000}
          />
          {uploadedMedia.length ? (
            <>
              <h4 className="mb-4">Files uploaded</h4>
              <ul className="flex gap-4 flex-wrap">
                {uploadedMedia.map((file: FileType) => {
                  return mediaList(file);
                })}
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      );
    }
    \`\`\`
    `

  const steps = [
    {
      title: "Install the Block code",
      code: fileUploadCommand,
      description: (
        <>
          This will add the `FileUpload.tsx` file to your blocks folder located
          in `cosmic/blocks/file-upload`. Includes the{" "}
          <a
            href="https://react-dropzone.js.org"
            className="text-cosmic-blue"
            target="_blank"
            rel="noreferrer"
          >
            React Dropzone
          </a>{" "}
          library. Uses React Server Actions and does not expose your Cosmic API
          keys to the client.
        </>
      ),
    },
    {
      title: "Import",
      code: fileUploadImportCode,
      description: "Import the block into your app.",
    },
    {
      title: "Usage",
      code: fileUploadUsageCode,
      description:
        "Configure the component to get the locales from any Object type that has localization enabled. Uses the short code `[locale]` in the linkPath to replace with the selected locale.",
    },
    {
      title: "Example",
      code: fileUploadExampleCode,
      description: `Add the component to any page that needs a file upload.`,
    },
  ]

  return (
    <>
      <CodeSteps steps={steps} featureKey="localization" />
    </>
  )
}
