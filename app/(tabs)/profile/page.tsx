"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/common/AppHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useI18n } from "@/i18n/i18n"
import { localeNames, type Locale } from "@/i18n/translations"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { User, Pencil, Globe, Moon, Heart, MessageSquare, Users, FileText, ChevronRight } from "lucide-react"

export default function ProfilePage() {
  const { t, locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("Foydalanuvchi")
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(displayName)

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim())
      setIsEditingName(false)
      toast.success(t("profile.nameSaved"))
    }
  }

  const activityItems = [
    { key: "likes", icon: Heart, label: t("profile.myLikes"), count: 5, href: "/profile/likes" },
    { key: "comments", icon: MessageSquare, label: t("profile.myComments"), count: 3, href: "/profile/comments" },
    { key: "subscriptions", icon: Users, label: t("profile.mySubscriptions"), count: 2, href: "/profile/subscriptions" },
  ]

  return (
    <>
      <AppHeader />
      <div className="p-4 space-y-6">
        {/* Profile Avatar & Name */}
        <div className="flex flex-col items-center gap-3 py-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gold/20 text-gold text-2xl font-bold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isEditingName ? (
            <div className="flex items-center gap-2 w-full max-w-xs">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder={t("profile.enterName")}
                className="text-center"
                autoFocus
              />
              <Button size="sm" onClick={handleSaveName} className="gold-button">
                {t("common.save")}
              </Button>
            </div>
          ) : (
            <button
              onClick={() => { setTempName(displayName); setIsEditingName(true) }}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span>{displayName}</span>
              <Pencil className="w-4 h-4 text-gold" />
            </button>
          )}
        </div>

        <Separator />

        {/* Language Selector */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-gold" />
            {t("profile.language")}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(localeNames) as Locale[]).map((loc) => (
              <Button
                key={loc}
                variant={locale === loc ? "default" : "outline"}
                size="sm"
                onClick={() => setLocale(loc)}
                className={locale === loc ? "gold-button" : ""}
              >
                {localeNames[loc]}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Moon className="w-4 h-4 text-gold" />
            {t("profile.darkMode")}
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>

        <Separator />

        {/* Activity */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold gold-text">{t("profile.myActivity")}</h3>
          <div className="space-y-1">
            {activityItems.map((item) => (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gold" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{item.count}</Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Legal */}
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => toast.info(t("legal.heading"))}
        >
          <FileText className="w-4 h-4 mr-2" />
          {t("profile.viewLegalRules")}
        </Button>
      </div>
    </>
  )
}
