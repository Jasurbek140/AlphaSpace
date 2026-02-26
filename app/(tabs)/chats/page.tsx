"use client"

import Link from "next/link"
import AppHeader from "@/components/common/AppHeader"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/i18n"
import { mockChatThreads, mockProducts } from "@/lib/mock-data"
import { MessageCircle } from "lucide-react"

export default function ChatsPage() {
  const { t } = useI18n()
  const threads = mockChatThreads

  return (
    <>
      <AppHeader />
      <div className="p-4">
        <h2 className="text-lg font-semibold glossy-yellow-text mb-4">{t("chats.title")}</h2>

        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <MessageCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">{t("chats.noChats")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => {
              const lastMessage = thread.messages[thread.messages.length - 1]
              const product = mockProducts.find((p) => p.id === thread.productId)
              const isOngoing = thread.status.type === "ongoing"

              return (
                <Link
                  key={thread.id}
                  href={`/chat/${thread.id}`}
                  className="block bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gold/20 text-gold font-semibold text-sm">
                        {thread.store.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm gold-text truncate">
                          {product?.name || "Product"}
                        </h3>
                        <Badge
                          variant={isOngoing ? "default" : "secondary"}
                          className="text-[10px] shrink-0"
                        >
                          {isOngoing ? t("chats.ongoing") : t("chats.ended")}
                        </Badge>
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">{t("chats.retentionNotice")}</p>
      </div>
    </>
  )
}
