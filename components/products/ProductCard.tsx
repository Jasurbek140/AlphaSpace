"use client"

import Link from "next/link"
import { Heart, MessageSquare, Bookmark } from "lucide-react"
import type { Product } from "@/types/backend"
import { formatPrice } from "@/utils/price"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isGolden = product.tier === "goldenRegular" || product.tier === "goldenInstagramTagged"

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "group block rounded-xl overflow-hidden transition-all duration-300",
        isGolden
          ? "golden-border hover:golden-glow"
          : "product-frame-dark hover:border-gold/40"
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.media.mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        {isGolden && (
          <Badge className="absolute top-2 left-2 bg-gold text-gold-dark border-0 text-[10px] font-bold">
            GOLDEN
          </Badge>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold gold-text">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" /> {product.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> {product.commentCount}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3" /> {product.saveCount}
          </span>
        </div>
      </div>
    </Link>
  )
}
