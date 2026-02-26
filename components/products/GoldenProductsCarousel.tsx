"use client"

import Link from "next/link"
import type { Product } from "@/types/backend"
import { formatPrice } from "@/utils/price"
import { useI18n } from "@/i18n/i18n"
import { Sparkles } from "lucide-react"

interface GoldenProductsCarouselProps {
  products: Product[]
}

export default function GoldenProductsCarousel({ products }: GoldenProductsCarouselProps) {
  const { t } = useI18n()

  if (products.length === 0) return null

  return (
    <section className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-semibold glossy-yellow-text">{t("products.goldenProducts")}</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="flex-shrink-0 w-40 golden-border rounded-xl overflow-hidden transition-all hover:golden-glow"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.media.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="p-2">
              <h3 className="text-xs font-semibold text-foreground truncate">{product.name}</h3>
              <p className="text-xs font-bold gold-text mt-1">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
