import "./globals.css"
import { Playfair_Display, Roboto } from "next/font/google"
import type React from "react" // Import React

const playfair = Playfair_Display({ subsets: ["latin"] })
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] })

export const metadata = {
  title: "iLikeIt.ai",
  description: "join the waitlist for iLikeIt.ai",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${roboto.className}`}>{children}</body>
    </html>
  )
}

