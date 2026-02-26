import BottomTabBar from "@/components/navigation/BottomTabBar"

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-16">
      <main>{children}</main>
      <BottomTabBar />
    </div>
  )
}
