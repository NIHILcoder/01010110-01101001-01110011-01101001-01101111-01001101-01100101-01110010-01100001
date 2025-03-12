import { ParticlesBackground } from "@/components/particles-background"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container relative mx-auto py-8">
      <ParticlesBackground />

      <div className="mx-auto max-w-3xl space-y-12">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">About VisioMera</h1>
          <p className="text-xl text-muted-foreground">Empowering creativity through AI art generation</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            VisioMera was created to democratize digital art creation by making powerful AI tools accessible to
            everyone. We believe that creativity should not be limited by technical skill, but rather enhanced by
            technology that helps bring your imagination to life.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform combines the power of ComfyUI, Flux models, and other cutting-edge AI technologies to provide
            an intuitive yet powerful interface for creating stunning visual art.
          </p>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Meet the Developer</h2>
          <Card>
            <CardContent className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:text-left">
              <img
                src="/placeholder.svg?height=150&width=150&text=PN"
                alt="Proxy Nihil"
                className="h-32 w-32 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">Proxy Nihil</h3>
                <p className="mt-2 text-muted-foreground">
                  Proxy Nihil is a developer and AI enthusiast passionate about the intersection of technology and
                  creativity. With a background in computer science and digital art, they created VisioMera to bridge
                  the gap between technical complexity and artistic expression.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Development Timeline</h2>
          <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
            {[
              {
                date: "March 2025",
                title: "VisioMera Launch",
                description: "Initial release with core generation features and community hub.",
              },
              {
                date: "January 2025",
                title: "Beta Testing",
                description: "Invited users test the platform and provide feedback for improvements.",
              },
              {
                date: "October 2024",
                title: "Development Begins",
                description: "Work starts on creating a user-friendly interface for ComfyUI and Flux models.",
              },
              {
                date: "August 2024",
                title: "Concept Phase",
                description: "Research and planning for an accessible AI art generation platform.",
              },
            ].map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-8 top-1 h-5 w-5 rounded-full bg-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <p className="mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "ComfyUI",
                description: "A powerful and modular UI system for Stable Diffusion and other generative models.",
              },
              {
                title: "Flux Models",
                description: "State-of-the-art image generation models optimized for quality and speed.",
              },
              {
                title: "Next.js",
                description: "React framework for building fast and responsive web applications.",
              },
              {
                title: "Tailwind CSS",
                description: "Utility-first CSS framework for rapid UI development.",
              },
            ].map((tech, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-bold">{tech.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "What is VisioMera?",
                answer:
                  "VisioMera is a web application for AI art generation based on ComfyUI, Flux models, and similar technologies. It provides an intuitive interface for creating digital art using AI.",
              },
              {
                question: "Do I need technical knowledge to use VisioMera?",
                answer:
                  "No, VisioMera is designed to be accessible to everyone. The Beginner mode provides a simple interface, while Advanced mode offers more options for those who want deeper control.",
              },
              {
                question: "Is VisioMera free to use?",
                answer:
                  "VisioMera offers both free and premium tiers. The free tier provides access to basic features, while premium subscriptions unlock additional models, higher resolution outputs, and priority generation.",
              },
              {
                question: "Who owns the images I create?",
                answer:
                  "You retain full ownership of any images you create using VisioMera. You're free to use them for personal or commercial purposes according to our terms of service.",
              },
              {
                question: "Can I use my own custom models?",
                answer:
                  "Yes, advanced users can import and use custom models in VisioMera. This feature is available in the Advanced mode.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Message subject" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

