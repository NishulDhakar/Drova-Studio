import * as React from "react"
import { Mail } from "lucide-react"

export function SocialLinks() {
  const socials = [
    {
      name: "X (Twitter)",
      href: "https://x.com/drovastudio",
      icon: (
        <svg viewBox="0 0 24 24" className="size-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/drova.studio",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
    },
    {
      name: "Threads",
      href: "https://threads.net/@drova.studio",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <path d="M12 2a10 10 0 1 0 10 10v-1.5a2.5 2.5 0 0 0-5 0v1.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0V12" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:drovastudioofficial@gmail.com",
      icon: <Mail className="size-5" strokeWidth={2} />,
    },
  ]

  return (
    <div className="flex items-center justify-center gap-4 mt-12 animate-fade-in">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="flex items-center justify-center size-10 rounded-full border border-border/40 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:border-border/80 transition-all duration-300 backdrop-blur-[2px] hover:scale-105 active:scale-95"
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
