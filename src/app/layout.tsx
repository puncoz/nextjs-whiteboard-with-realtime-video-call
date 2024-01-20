import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { type FunctionComponent, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next WhiteBoard",
  description: "A whiteboard app with realtime collaboration.",
}

interface Props {
  children: ReactNode
}

const RootLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.className,
        "bg-background text-foreground h-screen",
      )}
            suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
