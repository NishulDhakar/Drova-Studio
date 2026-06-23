"use client"

import * as React from "react"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { Highlighter } from "@/components/ui/highlighter"
import { supabase } from "@/lib/supabase"

export function WaitlistProof() {
  const [count, setCount] = React.useState(200) 

  React.useEffect(() => {
    async function fetchWaitlistCount() {
      try {
        // Call a secure RPC function to get the count.
        // This prevents exposing waitlist emails via client-side SELECT RLS policies.
        const { data: dbCount, error } = await supabase.rpc("get_waitlist_count")

        if (!error && dbCount !== null) {
          setCount(200 + Number(dbCount))
        } else if (error) {
          console.log("Supabase RPC error (falling back to default):", error.message)
        }
      } catch (err) {
        console.error("Error fetching waitlist count:", err)
      }
    }

    fetchWaitlistCount()
  }, [])

  const avatarUrls = [
    { imageUrl: "/avatars/creator-1.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-2.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-3.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-4.png", profileUrl: "#" },
    { imageUrl: "/avatars/creator-5.png", profileUrl: "#" },
  ]

  // Dynamic remaining count for AvatarCircles (total count minus the 5 visible avatars)
  const numPeople = Math.max(0, count - avatarUrls.length)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      {/* Overlapping Avatar Stack using AvatarCircles */}
      <AvatarCircles avatarUrls={avatarUrls} numPeople={numPeople} className="rtl:space-x-reverse" />

      {/* Waitlist Copy */}
      <div className="flex flex-col text-center sm:text-left">
        <span className="text-[15px] font-semibold text-foreground tracking-tight">
          {count} creators are already on the waitlist
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
