import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Drova Studio | AI Video Creation for Content Creators",
    template: "%s | Drova Studio",
  },
  description: "Create videos 10x faster with AI avatars and voice cloning. The unfair advantage for content creators.",
  metadataBase: new URL("https://drova.studio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Drova Studio | AI Video Creation for Content Creators",
    description: "Create videos 10x faster with AI avatars and voice cloning. The unfair advantage for content creators.",
    url: "https://drova.studio",
    siteName: "Drova Studio",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Drova Studio - AI Video Creation for Content Creators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drova Studio | AI Video Creation for Content Creators",
    description: "Create videos 10x faster with AI avatars and voice cloning. The unfair advantage for content creators.",
    images: ["/opengraph.png"],
    creator: "@drovastudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
