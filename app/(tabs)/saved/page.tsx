"use client"

import { useState } from "react"
import AppHeader from "@/components/common/AppHeader"
import ProductGrid from "@/components/products/ProductGrid"
import { useI18n } from "@/i18n/i18n"
import { mockProducts } from "@/lib/mock-data"
import { Bookmark } from "lucide-react"

export default function SavedPage() {
  const { t } = useI18n()
  // In a real app, this would come from the backend
  const [savedProducts] = useState(mockProducts.slice(0, 3))

  return (
    <>
      <AppHeader />
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-semibold glossy-yellow-text">{t("saved.savedProducts")}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{savedProducts.length} {t("products.allProducts").toLowerCase()}</p>
      </div>
      {savedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <Bookmark className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-center">{t("saved.noSaved")}</p>
        </div>
      ) : (
        <ProductGrid products={savedProducts} />
      )}
    </>
  )
}
