"use client"

import type { Product } from "@/types/backend"
import ProductCard from "./ProductCard"
import { useI18n } from "@/i18n/i18n"

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { t } = useI18n()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="product-frame-dark rounded-xl animate-pulse">
            <div className="aspect-square bg-muted/30 rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted/30 rounded w-3/4" />
              <div className="h-3 bg-muted/30 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="text-muted-foreground text-center">{t("products.noProducts")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
