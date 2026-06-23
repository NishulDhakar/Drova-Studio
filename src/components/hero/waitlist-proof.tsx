import * as React from "react"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { Highlighter } from "@/components/ui/highlighter"

export function WaitlistProof() {
  const avatarUrls = [
    { imageUrl: "/avatars/creator-1.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-2.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-3.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-4.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-5.png", profileUrl: "#" },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      {/* Overlapping Avatar Stack using AvatarCircles */}
      <AvatarCircles avatarUrls={avatarUrls} numPeople={382} className="rtl:space-x-reverse" />

      {/* Waitlist Copy */}
      <div className="flex flex-col text-center sm:text-left">
        <span className="text-[15px] font-semibold text-foreground tracking-tight">
          387 creators are already on the waitlist
        </span>
        <span className="text-[13px] text-muted-foreground font-sans mt-0.5">
          Be the first to create.{" "}
          <Highlighter 
            action="underline" 
            color="rgba(99, 102, 241, 0.4)" 
            strokeWidth={2}
            animationDuration={850}
            padding={1}
          >
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer">
              Get early access.
            </span>
          </Highlighter>
        </span>
      </div>
    </div>
  )
}
