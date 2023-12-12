import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Navbar from "@/components/layouts/Navbar"
import NextTopLoader from "nextjs-toploader"
import Footer from "@/components/layouts/Footer"
import ThemeProvider from "@/components/layouts/Providers"
import Providers from "@/components/layouts/Providers"
// import Providers from "@/components/layouts/Providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
            "mx-auto flex min-h-screen w-full justify-center bg-light-background font-sans antialiased dark:bg-dark-background",
            fontSans.variable
          )}
        >
          <NextTopLoader speed={400} />
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="mx-auto flex w-screen grow flex-col items-center justify-center overflow-x-hidden">
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
