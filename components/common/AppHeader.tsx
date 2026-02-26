"use client"

import { BRANDING } from "@/config/branding"

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-center h-14 px-4">
        <h1 className="text-2xl font-serif brand-name-elegant tracking-wide">
          {BRANDING.platformName}
        </h1>
      </div>
    </header>
  )
}
