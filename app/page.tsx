import { GenerationForm } from "@/components/generation-form"
import { ParticlesBackground } from "@/components/particles-background"

export default function HomePage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />
      <GenerationForm className="mx-auto max-w-6xl" />
    </div>
  )
}

