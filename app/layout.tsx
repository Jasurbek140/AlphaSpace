import type { Metadata, Viewport } from "next"
import { Inter, Cinzel } from "next/font/google"
import { Providers } from "@/components/Providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" })
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })

export const metadata: Metadata = {
  title: "AlphaSpace - Marketplace",
  description: "Mahsulotlarni kashf eting va do'konlar bilan bog'laning. O'zbekiston uchun zamonaviy marketplace platformasi.",
  icons: { icon: "/images/alphaspace-favicon.png" },
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
