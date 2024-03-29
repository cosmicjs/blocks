import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import Navbar from "@/components/layouts/Navbar"
import NextTopLoader from "nextjs-toploader"
import Footer from "@/components/layouts/Footer"
import Providers from "@/components/layouts/Providers"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body
          className={cn(
            "mx-auto flex min-h-screen w-screen justify-center bg-light-background font-sans antialiased dark:bg-dark-background",
            fontSans.variable
          )}
        >
          <NextTopLoader speed={400} />
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="grow flex-col items-center justify-center overflow-x-hidden">
                {children}
              </div>
              <Footer />
            </div>
            <TailwindIndicator />
            <Toaster />
          </Providers>
        </body>
      </html>
    </>
  )
}
