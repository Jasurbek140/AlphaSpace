"use client"

import { create } from "zustand"
import { translations, type Locale } from "./translations"

function getNestedValue(obj: Record<string, any>, path: string): string {
  const keys = path.split(".")
  let current: any = obj
  for (const key of keys) {
    if (current === undefined || current === null) return path
    current = current[key]
  }
  return typeof current === "string" ? current : path
}

interface I18nState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

export const useI18n = create<I18nState>((set, get) => ({
  locale: "uz_Latn",
  setLocale: (locale: Locale) => set({ locale }),
  t: (key: string, params?: Record<string, string | number>) => {
    const { locale } = get()
    const dict = translations[locale]
    let value = getNestedValue(dict as Record<string, any>, key)
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{{${k}}}`, String(v))
      })
    }
    return value
  },
}))
