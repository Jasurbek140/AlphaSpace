"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ProductGrid from "@/components/products/ProductGrid"
import { mockStores, mockProducts } from "@/lib/mock-data"
import { useI18n } from "@/i18n/i18n"
import { toast } from "sonner"

export default function StoreProfilePage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = use(params)
  const router = useRouter()
  const { t } = useI18n()

  const store = mockStores.find((s) => s.owner === storeId)
  const products = mockProducts.filter((p) => p.storeId === storeId)

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Store not found</p>
      </div>
    )
  }

  const isGolden = store.mode === "golden"

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold gold-text truncate">{store.name}</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Store Info */}
        <div className={`p-4 rounded-xl ${isGolden ? "golden-border" : "dark-label-surface"}`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold text-2xl font-bold shrink-0">
              {store.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold glossy-yellow-text truncate">{store.name}</h2>
                {isGolden && (
                  <Badge className="bg-gold text-gold-dark border-0 text-[10px] shrink-0">
                    <Crown className="w-3 h-3 mr-0.5" /> GOLDEN
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{store.description}</p>
              {store.addressLink && (
                <a href={store.addressLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gold mt-2">
                  <MapPin className="w-3 h-3" /> View on map
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gold-button" onClick={() => toast.info("Subscribed!")}>
            Subscribe
          </Button>
          {isGolden && (
            <Button variant="outline" className="flex-1 gold-border" onClick={() => toast.info("AI Assistant")}>
              <Sparkles className="w-4 h-4 mr-2" /> AI Assistant
            </Button>
          )}
        </div>

        <Separator />

        {/* Store Products */}
        <h3 className="text-lg font-semibold glossy-yellow-text">{t("products.allProducts")}</h3>
      </div>

      <ProductGrid products={products} />
    </div>
  )
}
