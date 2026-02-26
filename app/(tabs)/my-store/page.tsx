"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/common/AppHeader"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/i18n/i18n"
import { mockProducts, mockStores } from "@/lib/mock-data"
import { formatPrice } from "@/utils/price"
import { Plus, Sparkles, Bell, MessageSquare, Store, Crown } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function MyStorePage() {
  const { t } = useI18n()
  const router = useRouter()
  const [hasStore, setHasStore] = useState(true)

  // Mock data - in real app, comes from backend
  const storeProfile = mockStores[0]
  const products = mockProducts.filter((p) => p.storeId === "store_1")
  const isGoldenStore = storeProfile.mode === "golden"

  if (!hasStore) {
    return (
      <>
        <AppHeader />
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 space-y-6">
          <Store className="w-16 h-16 text-gold/30" />
          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-3xl font-bold glossy-yellow-text">{t("store.becomeSellerTitle")}</h1>
            <p className="text-muted-foreground">{t("store.becomeSellerDescription")}</p>
            <Button onClick={() => { setHasStore(true); toast.success(t("store.storeCreatedSuccess")) }} className="gold-button">
              {t("store.becomeSeller")}
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <AppHeader />

      {/* Store Header */}
      <div className="p-4 space-y-4">
        <div className="dark-label-surface p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold text-2xl font-bold">
              {storeProfile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold glossy-yellow-text">{storeProfile.name}</h2>
                {isGoldenStore && (
                  <Badge className="bg-gold text-gold-dark border-0 text-[10px]">
                    <Crown className="w-3 h-3 mr-0.5" /> GOLDEN
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{storeProfile.description}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gold-border" onClick={() => toast.info(t("store.storeInformationButton"))}>
            <Store className="w-4 h-4 mr-2" />
            {t("store.storeInformationButton")}
          </Button>
          <Button variant="outline" className="gold-border" onClick={() => router.push("/my-store/messages")}>
            <MessageSquare className="w-4 h-4 mr-2" />
            {t("store.messages")}
          </Button>
        </div>

        {/* Golden AI Assistant */}
        {isGoldenStore && (
          <div className="dark-label-surface p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-semibold glossy-yellow-text">{t("store.goldenAssistant")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{t("store.assistantKnowledgePlaceholder")}</p>
          </div>
        )}

        {/* Upgrade Banner for Stock */}
        {!isGoldenStore && (
          <div className="golden-shimmer-frame p-4 rounded-xl text-center">
            <Crown className="w-8 h-8 mx-auto text-gold-dark mb-2" />
            <h3 className="font-bold text-gold-dark">{t("store.upgradeToGoldenTitle")}</h3>
            <p className="text-xs text-gold-dark/80 mt-1">{t("store.upgradeToGoldenSubtitle")}</p>
            <Button className="mt-3 bg-gold-dark text-gold-light hover:bg-gold-dark/90" size="sm">
              {t("store.upgradeButton")}
            </Button>
          </div>
        )}

        {/* Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between dark-label-surface p-3 rounded-lg">
            <h2 className="text-xl font-semibold glossy-yellow-text">{t("store.myProducts")}</h2>
            <Button onClick={() => toast.info(t("store.addProduct"))} className="gold-button flex items-center gap-2" size="sm">
              <Plus className="w-4 h-4" />
              {t("store.addProduct")}
            </Button>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="product-frame-dark rounded-xl overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={product.media.mainImage} alt={product.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-semibold truncate">{product.name}</h3>
                    <p className="text-xs gold-text mt-1">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 dark-label-surface rounded-lg">
              <p className="text-muted-foreground">{t("store.noProducts")}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
