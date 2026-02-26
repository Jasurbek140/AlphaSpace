"use client"

import { useState, useMemo } from "react"
import AppHeader from "@/components/common/AppHeader"
import GoldenProductsCarousel from "@/components/products/GoldenProductsCarousel"
import ProductGrid from "@/components/products/ProductGrid"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Sparkles } from "lucide-react"
import { useI18n } from "@/i18n/i18n"
import { mockProducts } from "@/lib/mock-data"

export default function ProductsPage() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const goldenProducts = useMemo(
    () => mockProducts.filter((p) => p.tier === "goldenRegular" || p.tier === "goldenInstagramTagged"),
    []
  )

  const stockProducts = useMemo(
    () => mockProducts.filter((p) => p.tier === "stockProduct"),
    []
  )

  const filteredProducts = useMemo(() => {
    let products = mockProducts
    if (activeTab === "golden") products = goldenProducts
    else if (activeTab === "stock") products = stockProducts

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    }

    return products
  }, [activeTab, searchTerm, goldenProducts, stockProducts])

  return (
    <>
      <AppHeader />

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("products.searchPlaceholder")}
            className="pl-9 bg-card/80 backdrop-blur-sm border-border/50"
          />
        </div>
      </div>

      {/* Golden Products Carousel */}
      {!searchTerm && goldenProducts.length > 0 && (
        <GoldenProductsCarousel products={goldenProducts} />
      )}

      {/* Tabs */}
      <div className="px-4 pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="flex-1 text-xs data-[state=active]:text-gold">
              {t("products.allProducts")}
            </TabsTrigger>
            <TabsTrigger value="golden" className="flex-1 text-xs data-[state=active]:text-gold">
              <Sparkles className="w-3 h-3 mr-1" />
              Golden
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex-1 text-xs data-[state=active]:text-gold">
              Stock
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </>
  )
}
