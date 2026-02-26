"use client"

import SubpageHeader from "@/components/common/SubpageHeader"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useI18n } from "@/i18n/i18n"
import { mockComments } from "@/lib/mock-data"

export default function ProfileCommentsPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background pb-20">
      <SubpageHeader title={t("profile.myComments")} backHref="/profile" />
      <div className="p-4">
        {mockComments.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">{t("profile.noComments")}</p>
        ) : (
          <ScrollArea className="h-[70vh]">
            <div className="space-y-3">
              {mockComments.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(c.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-sm">{c.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
