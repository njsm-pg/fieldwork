import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/providers/query-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fieldwork - Survey Research Platform",
  description: "Run consumer market research surveys with targeted ad campaigns",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
