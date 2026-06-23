"use client"

import * as React from "react"
import { Mail, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RippleButton } from "../ui/ripple-button"

export function EmailForm() {
  const [email, setEmail] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email subscription logic here
    alert(`Subscribed: ${email}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col sm:flex-row items-stretch justify-center gap-3">
      <div className="relative flex-1">
        <Mail className="absolute  left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-11 h-12 w-full bg-secondary border border-border/60 text-foreground font-sans placeholder:text-muted-foreground/50 rounded-md focus-visible:ring-1 focus-visible:ring-ring transition-all duration-200"
        />
      </div>
      <RippleButton
        type="submit"
        rippleColor="currentColor"
        className="h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/95 border-none rounded-md group whitespace-nowrap"
      >
        <span className="flex text-secondary-foreground items-center gap-2">
          Get Early Access
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </RippleButton>
    </form>
  )
}
