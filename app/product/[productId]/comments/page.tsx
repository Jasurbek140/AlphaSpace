"use client"

import { use, useState } from "react"
import SubpageHeader from "@/components/common/SubpageHeader"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockComments } from "@/lib/mock-data"
import { useI18n } from "@/i18n/i18n"
import { toast } from "sonner"

export default function ProductCommentsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params)
  const { t } = useI18n()
  const [comment, setComment] = useState("")
  const [localComments, setLocalComments] = useState(
    mockComments.filter((c) => c.productId === productId)
  )

  const handleSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: `c_${Date.now()}`,
        content: comment.trim(),
        productId,
        author: "current_user",
        timestamp: Date.now(),
      }
      setLocalComments((prev) => [newComment, ...prev])
      setComment("")
      toast.success("Comment added")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SubpageHeader title={t("products.comments")} backHref={`/product/${productId}`} />

      <div className="p-4 space-y-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border p-4 space-y-3">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("products.commentPlaceholder")}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmit} disabled={!comment.trim()} className="w-full gold-button">
            {t("products.addComment")}
          </Button>
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border p-4">
          <h2 className="text-lg font-semibold gold-text mb-4">
            {t("products.comments")} ({localComments.length})
          </h2>
          {localComments.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">{t("products.noComments")}</p>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {localComments.map((c) => (
                  <div key={c.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">{c.author.slice(0, 12)}...</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(c.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{c.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  )
}
