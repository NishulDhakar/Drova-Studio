import * as React from "react"
import { LaunchingBadge } from "./badge"
import { EmailForm } from "./email-form"
import { Features } from "./features"
import { WaitlistProof } from "./waitlist-proof"
import { SocialLinks } from "./social-links"

export function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto py-0 sm:py-24 px-4 flex flex-col items-center text-center gap-8 sm:gap-10 select-none">
      {/* 1. Launching Badge */}
      <LaunchingBadge />

      {/* 2. Headline & Subheading */}
      <div className="flex flex-col items-center gap-4 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-heading font-extrabold tracking-tight leading-[1.05] text-foreground">
          The unfair advantage  <br className="hidden sm:inline" />
          for content <span className="text-indigo-600 dark:text-indigo-400">creators.</span>
        </h1>
        
        <p className="subheading text-base sm:text-lg md:text-xl max-w-2xl text-muted-foreground mt-2 leading-relaxed">
         Create videos 10× faster with AI avatars and voice cloning.
        </p>
      </div>

      {/* 3. Subscription Form */}
      <div className="w-full flex justify-center mt-2">
        <EmailForm />
      </div>

      {/* 4. Feature Highlights */}
      <Features />

      {/* 5. Waitlist / Social Proof */}
      <WaitlistProof />

      {/* 6. Social Links */}
      <SocialLinks />
    </section>
  )
}
