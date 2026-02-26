"use client"

import { use, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockChatThreads, mockProducts } from "@/lib/mock-data"
import { useI18n } from "@/i18n/i18n"
import type { ChatMessage } from "@/types/backend"

export default function ChatThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = use(params)
  const router = useRouter()
  const { t } = useI18n()
  const [messageText, setMessageText] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const thread = mockChatThreads.find((t) => t.id === threadId)
  const product = thread ? mockProducts.find((p) => p.id === thread.productId) : null

  const [messages, setMessages] = useState<ChatMessage[]>(thread?.messages || [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!messageText.trim()) return
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      content: messageText.trim(),
      sender: "current_user",
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, newMsg])
    setMessageText("")

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `m_ai_${Date.now()}`,
        content: "Rahmat savolingiz uchun! Sizga qanday yordam bera olaman?",
        sender: "assistant",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1500)
  }

  if (!thread) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Chat topilmadi</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shrink-0">
        <div className="flex items-center px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="ml-3 flex-1 min-w-0">
            <h1 className="text-sm font-semibold gold-text truncate">{product?.name || "Chat"}</h1>
            <Badge
              variant={thread.status.type === "ongoing" ? "default" : "secondary"}
              className="text-[10px] mt-0.5"
            >
              {thread.status.type === "ongoing" ? t("chats.ongoing") : t("chats.ended")}
            </Badge>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isOutgoing = msg.sender === "current_user"
          return (
            <div key={msg.id} className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 border ${
                  isOutgoing
                    ? "bg-gold/20 border-gold/40 text-foreground"
                    : "bg-card border-border text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                <p className="text-[10px] mt-1 text-muted-foreground">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border p-3 bg-background/95 backdrop-blur">
        <div className="flex gap-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={t("products.messagePlaceholder")}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="icon" onClick={handleSend} disabled={!messageText.trim()} className="gold-button shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
