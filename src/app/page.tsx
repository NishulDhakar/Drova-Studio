import { Hero } from "@/components/hero"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

export default function Page() {
  return (
    <main className="flex-grow w-full min-h-screen flex justify-center relative overflow-hidden bg-background py-12 px-4 sm:p-8">
      {/* Flickering Grid Background */}
      {/* <FlickeringGrid
        className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_90%)] dark:[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]"
        squareSize={4}
        gridGap={6}
        color="rgba(99, 102, 241, 0.25)"
        maxOpacity={0.4}
        flickerChance={0.06}
      /> */}
      
      {/* Centered Hero Container */}
      <div className="relative z-10 w-full max-w-5xl">
        <Hero />
      </div>
    </main>
  )
}