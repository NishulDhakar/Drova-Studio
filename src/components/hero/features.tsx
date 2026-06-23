import * as React from "react"
import { VideoOff, Zap, Tag } from "lucide-react"

export function Features() {
  const items = [
    {
      icon: VideoOff,
      title: "No camera",
      subtitle: "We handle everything.",
    },
    {
      icon: Zap,
      title: "Create in minutes",
      subtitle: "Not hours.",
    },
    {
      icon: Tag,
      title: "Early access & pricing",
      subtitle: "Lifetime founder deal.",
    },
  ]

  return (
    <div className="w-full hidden sm:flex max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4 mt-6">
      {items.map((item, idx) => {
        const Icon = item.icon
        return (
          <div key={idx} className="flex items-center gap-4 text-left p-3 rounded-2xl">
            <div className="flex-shrink-0 size-11 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/20">
              <Icon className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-foreground tracking-tight">
                {item.title}
              </span>
              <span className="text-[13px] text-muted-foreground font-sans mt-0.5">
                {item.subtitle}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
