// TypeScript types adapted from ICP Candid declarations
// Using simple strings instead of Principal, and string URLs instead of ExternalBlob

export interface ChatMessage {
  id: string
  content: string
  sender: string
  timestamp: number
}

export type ChatStatus =
  | { type: "ended"; time: number }
  | { type: "takenOver"; takeoverTime: number }
  | { type: "ongoing" }

export interface Comment {
  id: string
  content: string
  productId: string
  author: string
  timestamp: number
}

export type ConsentType = "firstVisit" | "sellerOnboarding"

export interface EditableProductFields {
  id: string
  name: string
  description: string
  price: number
}

export interface Notification {
  id: string
  notificationType: NotificationType
  recipient: string
  isRead: boolean
  message: string
  timestamp: number
}

export type NotificationType =
  | { type: "humanSellerRequested"; threadId?: string }
  | { type: "newChatStarted" }

export interface Product {
  id: string
  media: ProductMedia
  likeCount: number
  storeId: string
  name: string
  tier: ProductTier
  description: string
  monthlyPrice: number
  commentCount: number
  price: number
  saveCount: number
}

export interface ProductMedia {
  is3DModel: boolean
  productVideo?: string
  imageCarousel: string[]
  mainImage: string
}

export interface ProductQuery {
  sortBy?: "relevance" | "priceDesc" | "priceAsc"
  storeId?: string
  priceRange?: [number, number]
  searchTerm?: string
}

export interface ProductSearchResult {
  assistantAnswer: string
  filteredProducts: Product[]
}

export type ProductTier = "goldenRegular" | "goldenInstagramTagged" | "stockProduct"

export interface StoreImage {
  blob: string
  description: string
}

export interface StoreMedia {
  logoImage?: string
  overviewVideo?: string
  storeImages: StoreImage[]
  storeInterior360?: string
}

export type StoreMode = "golden" | "stock"

export interface StoreProfile {
  media: StoreMedia
  owner: string
  mode: StoreMode
  name: string
  assistantKnowledge: string
  description: string
  addressLink: string
}

export interface UserProfile {
  name: string
}

export type UserRole = "admin" | "user" | "guest"

export interface ChatThread {
  id: string
  status: ChatStatus
  messages: ChatMessage[]
  lastUpdate?: number
  productId: string
  store: string
  buyer: string
}
