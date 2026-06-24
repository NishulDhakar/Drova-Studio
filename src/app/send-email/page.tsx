"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SocialLinks } from "@/components/hero/social-links"

export default function SendEmailPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error"
    message: string
  }>({ type: "idle", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus({ type: "idle", message: "" })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Email sent successfully! Check your inbox (and spam folder).",
        })
        setEmail("")
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send email. Please try again.",
        })
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "An error occurred. Please check your connection and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-grow w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4 sm:p-8">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top gradient border accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="size-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 border border-indigo-500/20">
              <Mail className="size-6" />
            </div>
            <h1 className="text-3xl font-heading mb-2">
              Send a Mail
            </h1>
            <p className="text-sm text-muted-foreground max-w-[280px]">
              Paste your email address below to test our automated email delivery system.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold tracking-wide uppercase text-foreground/80">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="pl-9 h-11 rounded-xl bg-secondary/40 border-border focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 dark:bg-secondary/10 text-foreground"
                />
                <Mail className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full h-11 rounded-xl font-medium flex items-center justify-center gap-2 transition-transform active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Test Email
                </>
              )}
            </Button>
          </form>

          {/* Feedback message */}
          {status.type !== "idle" && (
            <div 
              className={`mt-5 p-4 rounded-xl border text-sm flex gap-3 animate-in fade-in-50 slide-in-from-bottom-2 duration-200 ${
                status.type === "success" 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                  : "bg-destructive/10 border-destructive/20 text-destructive"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="size-5 shrink-0" />
              ) : (
                <AlertCircle className="size-5 shrink-0" />
              )}
              <div className="flex-grow">
                <p className="font-semibold mb-0.5">
                  {status.type === "success" ? "Success!" : "Error"}
                </p>
                <p className="text-xs opacity-90 leading-normal">
                  {status.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <SocialLinks />
        
        {/* Environment setup warning/instruction */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[320px] mx-auto">
            Ensure you configure the SMTP environment variables in your <code className="bg-secondary/80 dark:bg-secondary/20 px-1 py-0.5 rounded text-[10px] font-mono border border-border">.env</code> file.
          </p>
        </div>
      </div>
    </main>
  )
}
