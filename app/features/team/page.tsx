/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import CodeSteps from "@/components/layouts/CodeSteps"

export default async function Team({
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
      <section className="container m-auto grid  items-center pb-8">
        {tab === "preview" ? <Preview /> : <Code />}
      </section>
    </>
  )
}

type MemberType = {
  title: string
  slug: string
  metadata: {
    image: {
      imgix_url: string
    }
    position: string
    bio: string
    links: {
      x: string
      linkedin: string
    }
  }
}

function TeamCard({ member }: { member: MemberType }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-slate-100 shadow-lg dark:bg-slate-800 md:flex-row">
      <div className="h-full w-full md:w-2/5">
        <img
          className="h-full w-full object-cover object-center"
          src={`${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}`}
          alt={member.title}
        />
      </div>
      <div className="w-full space-y-2 p-6 text-left md:w-3/5 md:p-4">
        <p className="text-xl font-bold text-slate-700 dark:text-slate-100">
          {member.title}
        </p>
        <p className="text-base font-normal text-slate-700 dark:text-slate-100">
          {member.metadata.position}
        </p>
        <p className="text-base font-normal leading-relaxed text-slate-700 dark:text-gray-300">
          {member.metadata.bio}
        </p>
        <div className="flex justify-start space-x-4 py-4">
          {member.metadata.links.x && (
            <a
              href={member.metadata.links.x}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg
                color="currentColor"
                aria-label="X"
                fill="currentColor"
                height="22"
                viewBox="0 0 22 20"
              >
                <path
                  d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 
                    0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          )}
          {member.metadata.links.linkedin && (
            <a
              href={member.metadata.links.linkedin}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
async function Preview() {
  const cosmic = cosmicSourceBucketConfig
  const { objects: members } = await cosmic.objects
    .find({
      type: "team-members",
    })
    .props("title,slug,metadata")
    .depth(1)
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {members.map((member: MemberType) => {
          return <TeamCard key={member.slug} member={member} />
        })}
      </div>
    </section>
  )
}
function Code() {
  const codeString = dedent`
    \`\`\`jsx
    // components/team-card.tsx
    export type MemberType = {
      title: string
      slug: string
      metadata: {
        image: {
          imgix_url: string
        }
        position: string
        bio: string
        links: {
          x: string
          linkedin: string
        }
      }
    }
    export function TeamCard({ member }: { member: MemberType }) {
      return (
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-slate-100 shadow-lg dark:bg-slate-800 md:flex-row">
          <div className="h-full w-full md:w-2/5">
            <img
              className="h-full w-full object-cover object-center"
              src={\`\${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}\`}
              alt={member.title}
            />
          </div>
          <div className="w-full space-y-2 p-6 text-left md:w-3/5 md:p-4">
            <p className="text-xl font-bold text-slate-700 dark:text-slate-100">
              {member.title}
            </p>
            <p className="text-base font-normal text-slate-700 dark:text-slate-100">
              {member.metadata.position}
            </p>
            <p className="text-base font-normal leading-relaxed text-slate-700 dark:text-gray-300">
              {member.metadata.bio}
            </p>
            <div className="flex justify-start space-x-4 py-4">
              {member.metadata.links.x && (
                <a
                  href={member.metadata.links.x}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <svg
                    color="currentColor"
                    aria-label="X"
                    fill="currentColor"
                    height="22"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 
                        0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              )}
              {member.metadata.links.linkedin && (
                <a
                  href={member.metadata.links.linkedin}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )
    }
    \`\`\`
    `

  const steps = [
    {
      title:
        "Create a new file at `components/team-card.tsx` with the following",
      code: codeString,
    },
    {
      title:
        "Add the following to any page that needs the team. For example  add a new page at `app/about/page.tsx` with the following",
      code: dedent(`\`\`\`jsx
      // app/about/page.tsx
      import { cosmic } from "@/lib/cosmic";
      import { TeamCard, MemberType } from "@/components/team-card";
      
      export default async function AboutPage() {
        const { objects: members } = await cosmic.objects
          .find({
            type: "team-members",
          })
          .props("title,slug,metadata")
          .depth(1);
      
        return (
          <>
            <section className="container pb-8 m-auto">
              <div className="relative m-auto flex max-w-[950px] flex-col items-start gap-2">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  About us
                </h1>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {members.map((member: MemberType) => {
                    return <TeamCard key={member.slug} member={member} />;
                  })}
                </div>
              </div>
            </section>
          </>
        );
      }            
      \`\`\`
    `),
    },
  ]

  return (
    <div className="max-w-[800px]">
      <CodeSteps steps={steps} preview={<Preview />} />
    </div>
  )
}
