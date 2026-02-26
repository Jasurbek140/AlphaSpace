"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Bookmark, MessageSquare, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockProducts, mockComments } from "@/lib/mock-data"
import { formatPrice } from "@/utils/price"
import { useI18n } from "@/i18n/i18n"
import { toast } from "sonner"

export default function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params)
  const router = useRouter()
  const { t } = useI18n()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const product = mockProducts.find((p) => p.id === productId)
  const comments = mockComments.filter((c) => c.productId === productId)

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">{t("products.noProducts")}</p>
      </div>
    )
  }

  const isGolden = product.tier === "goldenRegular" || product.tier === "goldenInstagramTagged"

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold gold-text truncate mx-4">{product.name}</h1>
          <Button variant="ghost" size="icon" onClick={() => toast.info("Share link copied!")} aria-label="Share">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Image */}
      <div className="relative aspect-square">
        <img
          src={product.media.mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        {isGolden && (
          <Badge className="absolute top-4 left-4 bg-gold text-gold-dark border-0 font-bold">
            <Sparkles className="w-3 h-3 mr-1" /> GOLDEN
          </Badge>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-around py-3 px-4 border-b border-border">
        <button
          className="flex items-center gap-1.5 transition-colors"
          onClick={() => { setIsLiked(!isLiked); toast.success(isLiked ? "Like olib tashlandi" : "Yoqtirildi!") }}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          <span className="text-sm">{product.likeCount + (isLiked ? 1 : 0)}</span>
        </button>
        <button
          className="flex items-center gap-1.5 text-muted-foreground"
          onClick={() => router.push(`/product/${productId}/comments`)}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">{product.commentCount}</span>
        </button>
        <button
          className="flex items-center gap-1.5 transition-colors"
          onClick={() => { setIsSaved(!isSaved); toast.success(isSaved ? "Saqlangan ro'yxatdan olib tashlandi" : "Saqlandi!") }}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? "fill-gold text-gold" : "text-muted-foreground"}`} />
          <span className="text-sm">{product.saveCount + (isSaved ? 1 : 0)}</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
          <p className="text-2xl font-bold gold-text mt-1">{formatPrice(product.price)}</p>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">{t("products.description")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        <Separator />

        {/* Comments Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">{t("products.comments")} ({comments.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-gold"
              onClick={() => router.push(`/product/${productId}/comments`)}
            >
              {t("products.viewDetails")}
            </Button>
          </div>
          {comments.length > 0 ? (
            <div className="space-y-2">
              {comments.slice(0, 2).map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">{c.author.slice(0, 12)}...</p>
                  <p className="text-sm">{c.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("products.noComments")}</p>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button className="w-full gold-button" size="lg">
          <MessageSquare className="w-4 h-4 mr-2" />
          {t("products.requestHumanSeller")}
        </Button>
      </div>
    </div>
  )
}
