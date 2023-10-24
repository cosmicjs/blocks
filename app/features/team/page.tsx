/* eslint-disable @next/next/no-img-element */
import dedent from "dedent"

import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { Markdown } from "@/components/elements/Markdown/Markdown"
import { SiteHeader } from "@/components/site-header"
import { TwitterIcon, GithubIcon, LinkedinIcon } from "lucide-react"

export default async function Testimonials({
  searchParams,
}: {
  searchParams: {
    tab?: "preview" | "tab"
  }
}) {
  let tab = searchParams.tab
  if (!tab) tab = "preview"

  const cosmic = cosmicSourceBucketConfig
  const { objects: members } = await cosmic.objects
    .find({
      type: "team-members",
    })
    .props("title,slug,metadata")
    .depth(1)

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
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg md:flex-row">
        <div className="h-full w-full md:w-2/5">
          <img className="h-full w-full object-cover object-center" src={`${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}`} alt={member.title} />
        </div>
        <div className="w-full space-y-2 p-6 text-left md:w-3/5 md:p-4">
          <p className="text-xl font-bold text-white">{member.title}</p>
          <p className="text-base font-normal text-gray-400">{member.metadata.position}</p>
          <p className="text-base font-normal leading-relaxed text-gray-500">{member.metadata.bio}</p>
          <div className="flex justify-start space-x-4 py-4">
            {member.metadata.links.x &&
              <a href={member.metadata.links.x} className="text-gray-500 hover:text-gray-600">
                <svg color="currentColor" aria-label="X formerly known as Twitter" fill="currentColor" height="22" viewBox="0 0 22 20"><path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" fill="currentColor"></path></svg>
              </a>
            }
            {member.metadata.links.linkedin &&
              <a href={member.metadata.links.linkedin} className="text-gray-500 hover:text-gray-600">
                <LinkedinIcon />
              </a>
            }
          </div>
        </div>
      </div>
    )
  }
  function Preview() {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {members.map((member: MemberType) => {
          return <TeamCard member={member} />
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
          <div className="flex w-full flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg md:flex-row">
            <div className="h-full w-full md:w-2/5">
              <img 
                className="h-full w-full object-cover object-center"
                src={\`\${member.metadata.image.imgix_url}?w=600&h=600&auto=format,compression&fit=crop&crop=faces}\`} 
                alt={member.title}
              />
            </div>
            <div className="w-full space-y-2 p-6 text-left md:w-3/5 md:p-4">
              <p className="text-xl font-bold text-white">{member.title}</p>
              <p className="text-base font-normal text-gray-400">{member.metadata.position}</p>
              <p className="text-base font-normal leading-relaxed text-gray-500">{member.metadata.bio}</p>
              <div className="flex justify-start space-x-4 py-4">
                {member.metadata.links.x &&
                  <a href={member.metadata.links.x} className="text-gray-500 hover:text-gray-600">
                    <svg color="currentColor" aria-label="X" fill="currentColor" height="22" viewBox="0 0 22 20">
                      <path
                        d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 
                          0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" 
                        fill="currentColor">
                      </path>
                    </svg>
                  </a>
                }
                {member.metadata.links.linkedin &&
                  <a href={member.metadata.links.linkedin} className="text-gray-500 hover:text-gray-600">
                    <LinkedinIcon />
                  </a>
                }
              </div>
            </div>
          </div>
        )
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
            Step 2. Add the Cosmic JavaScript SDK the React Markdown packages.
          </h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun add @cosmicjs/sdk
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
            Step 4. Create a new file at `components/team-card.tsx` with the
            following
          </h3>
          <Markdown>{codeString}</Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">
            Step 5. Add the following to any page that needs the team.
          </h3>
          <Markdown>
            {dedent(`\`\`\`jsx
            // app/about/page.tsx
            import { cosmic } from "@/lib/cosmic";
            import { TeamCard, MemberType } from "@/components/team-card";
            
            export default async function AboutPage() {
              
              const { objects: members } = await cosmic.objects
                .find({
                  type: "team-members",
                })
                .props("title,slug,metadata")
                .depth(1)
              
              return (
                <main className="container">
                  {/* page content above */}
                  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-4">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      {members.map((member: MemberType) => {
                        return <TeamCard member={member} />
                      })}
                    </div>
                  </section>
                  {/* page content below */}
                </main>
              );
            }
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold">Step 6. Run your app</h3>
          <Markdown>
            {dedent(`\`\`\`bash
            bun dev
            \`\`\`
          `)}
          </Markdown>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Step 7. Go to http://localhost:3000/about and any page where this
            team section has been added. It should look like this:
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
