"use client"

import * as React from "react"
import { Mail, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RippleButton } from "../ui/ripple-button"
import { supabase } from "@/lib/supabase"

export function EmailForm() {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: "" })

    try {
      const { error } = await supabase
        .from("waitlist_users")
        .insert([{ email }])

      if (error) {
        if (error.code === "23505") {
          setStatus({
            type: "error",
            message: "You are already on the waitlist! ✨",
          })
        } else {
          setStatus({
            type: "error",
            message: error.message || "Failed to join. Please try again.",
          })
        }
      } else {
        setStatus({
          type: "success",
          message: "Welcome to Drova Studio! You have joined the waitlist. 🎉",
        })
        setEmail("")
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-3">
      <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-stretch justify-center gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="pl-11 h-12 w-full bg-secondary border border-border/60 text-foreground font-sans placeholder:text-muted-foreground/50 rounded-md focus-visible:ring-1 focus-visible:ring-ring transition-all duration-200 disabled:opacity-50"
          />
        </div>
        <RippleButton
          type="submit"
          rippleColor="currentColor"
          disabled={loading}
          className="h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/95 border-none rounded-md group whitespace-nowrap disabled:opacity-60"
        >
          <span className="flex text-secondary-foreground items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Joining...</span>
              </>
            ) : (
              <>
                <span>Get Early Access</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </span>
        </RippleButton>
      </form>
      
      {/* Status messages */}
      {status.type && (
        <p className={`text-xs font-medium mt-1 font-sans ${
          status.type === "success" 
            ? "text-emerald-600 dark:text-emerald-400" 
            : "text-rose-600 dark:text-rose-400"
        }`}>
          {status.message}
        </p>
      )}
    </div>
  )
}
