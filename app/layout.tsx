import { Inter as FontSans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { cn } from "@/lib/utils"
import React from "react"
import "./globals.css"
import { Metadata } from "next"
import Provider from "./Provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://collabdocs-devsire.vercel.app'),
  title: 'CollabDocs: Real-time Collaborative Document Editing',
  description: 'CollabDocs is a powerful online tool that enables real-time collaboration on documents. Easily share, edit, and work together with your team, no matter where you are.'
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371ff",
          fontSize: "16px",
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
