"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubpageHeaderProps {
  title: string
  backHref?: string
}

export default function SubpageHeader({ title, backHref }: SubpageHeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center px-4 h-14">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold gold-text">{title}</h1>
      </div>
    </header>
  )
}
