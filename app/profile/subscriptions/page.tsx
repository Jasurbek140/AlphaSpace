"use client"

import Link from "next/link"
import SubpageHeader from "@/components/common/SubpageHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/i18n"
import { mockStores } from "@/lib/mock-data"
import { ChevronRight } from "lucide-react"

export default function ProfileSubscriptionsPage() {
  const { t } = useI18n()
  const subscribedStores = mockStores.slice(0, 2)

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubpageHeader title={t("profile.mySubscriptions")} backHref="/profile" />
      <div className="p-4 space-y-3">
        {subscribedStores.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">{t("profile.noSubscriptions")}</p>
        ) : (
          subscribedStores.map((store) => (
            <Link
              key={store.owner}
              href={`/store/${store.owner}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-gold/40 transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gold/20 text-gold font-semibold">
                  {store.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{store.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {store.mode === "golden" ? "Golden" : "Stock"}
                  </Badge>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
