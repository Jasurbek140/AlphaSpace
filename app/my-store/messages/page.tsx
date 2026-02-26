"use client"

import Link from "next/link"
import SubpageHeader from "@/components/common/SubpageHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/i18n"
import { mockChatThreads, mockProducts } from "@/lib/mock-data"
import { MessageCircle } from "lucide-react"

export default function MyStoreMessagesPage() {
  const { t } = useI18n()
  const threads = mockChatThreads

  return (
    <div className="min-h-screen bg-background">
      <SubpageHeader title={t("store.messages")} backHref="/my-store" />
      <div className="p-4 space-y-3">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <MessageCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">{t("chats.noChats")}</p>
          </div>
        ) : (
          threads.map((thread) => {
            const lastMessage = thread.messages[thread.messages.length - 1]
            const product = mockProducts.find((p) => p.id === thread.productId)

            return (
              <Link
                key={thread.id}
                href={`/chat/${thread.id}`}
                className="block bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gold/20 text-gold font-semibold text-sm">
                      {thread.buyer.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm gold-text truncate">
                        Buyer: {thread.buyer.slice(0, 12)}...
                      </h3>
                      <Badge
                        variant={thread.status.type === "ongoing" ? "default" : "secondary"}
                        className="text-[10px] shrink-0"
                      >
                        {thread.status.type === "ongoing" ? t("chats.ongoing") : t("chats.ended")}
                      </Badge>
                    </div>
                    {product && (
                      <p className="text-xs text-muted-foreground mb-1">{product.name}</p>
                    )}
                    {lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
