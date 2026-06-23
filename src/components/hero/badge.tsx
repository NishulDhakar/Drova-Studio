import * as React from "react"
import { Sparkles } from "lucide-react"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

export function LaunchingBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-border/80 text-[13px] font-medium tracking-wide transition-colors duration-200">
      <Sparkles className="size-3.5 animate-pulse" />
      <AnimatedShinyText className="inline-flex items-center text-[13px] font-medium text-foreground">
        Launching Soon
      </AnimatedShinyText>
    </div>
  )
}
