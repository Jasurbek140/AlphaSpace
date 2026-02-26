"use client"

import SubpageHeader from "@/components/common/SubpageHeader"
import ProductGrid from "@/components/products/ProductGrid"
import { useI18n } from "@/i18n/i18n"
import { mockProducts } from "@/lib/mock-data"

export default function ProfileLikesPage() {
  const { t } = useI18n()
  const likedProducts = mockProducts.slice(0, 4)

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubpageHeader title={t("profile.myLikes")} backHref="/profile" />
      <ProductGrid products={likedProducts} />
    </div>
  )
}
