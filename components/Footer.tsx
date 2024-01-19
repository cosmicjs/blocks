// components/footer.tsx
import { cosmicSourceBucketConfig } from "@/lib/cosmic"
import { buttonVariants } from "@/components/ui/button"
import { MailIcon, PhoneIcon } from "lucide-react"
import { NavMenu } from "@/components/NavMenu"

export default async function Footer() {
  const { object: settings } = await cosmicSourceBucketConfig.objects
    .findOne({
      type: "global-settings",
      slug: "settings",
    })
    .props("metadata")
    .depth(1)

  type Link = {
    url: string
    company: string
    icon: {
      imgix_url: string
    }
  }

  return (
    <nav className="container mx-auto flex w-full flex-col items-center justify-between lg:flex-row">
      <div className="my-8">
        <NavMenu
          query={{ type: "navigation-menus", slug: "footer" }}
          hasMobileMenu={false}
        />
      </div>
      <div className="mb-6 flex justify-center gap-x-4 text-zinc-700 dark:text-zinc-300 lg:mb-0">
        <div>
          <a
            href={`mailto:${settings.metadata.email}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <MailIcon className="mr-2 inline-block w-4" />
            Email us
          </a>
        </div>
        <div>
          <a
            href={`tel:${settings.metadata.phone}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <PhoneIcon className="mr-2 inline-block w-4" />
            Call us
          </a>
        </div>
      </div>
      <div className="mb-6 ml-6 flex justify-center gap-x-8 lg:mb-0">
        {settings.metadata.links.map((link: Link) => {
          return (
            <a href={link.url} key={link.url} target="_blank" rel="noreferrer">
              <img
                className="h-[26px]"
                src={`${link.icon.imgix_url}?w=500&auto=format,compression`}
                alt={link.company}
              />
            </a>
          )
        })}
      </div>
    </nav>
  )
}
