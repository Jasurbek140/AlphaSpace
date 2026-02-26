"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, MessageCircle, Bookmark, User, Store } from "lucide-react"
import { useI18n } from "@/i18n/i18n"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "products", href: "/", icon: ShoppingBag },
  { key: "chats", href: "/chats", icon: MessageCircle },
  { key: "saved", href: "/saved", icon: Bookmark },
  { key: "profile", href: "/profile", icon: User },
  { key: "myStore", href: "/my-store", icon: Store },
] as const

export default function BottomTabBar() {
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors",
                isActive ? "text-gold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_6px_oklch(75%_0.15_85)]")} />
              <span className="text-[10px] font-medium leading-tight">
                {t(`tabs.${tab.key}`)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
