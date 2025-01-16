import Hero from "@/components/hero"
import DashboardDemo from "@/components/dashboard-demo"
import Services from "@/components/services"
import ContactForm from "@/components/contact-form"
import AnimatedSection from "@/components/animated-section"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AnimatedSection className="pt-4 pb-16 md:pt-8 md:pb-24">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="bg-zinc-50/80 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">All your tools in one place</h2>
            <p className="text-lg text-muted-foreground text-center mb-6">hosted at admin.your-domain.com</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              <div className="bg-blue-50/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm border border-blue-100 text-blue-900">
                I make the app
              </div>
              <span className="text-primary hidden md:block">→</span>
              <div className="bg-purple-50/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm border border-purple-100 text-purple-900">
                You submit feature requests
              </div>
              <span className="text-primary hidden md:block">→</span>
              <div className="bg-rose-50/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm border border-rose-100 text-rose-900">
                Repeat
              </div>
            </div>
            <DashboardDemo />
            <div className="mt-8 flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="bg-zinc-100 p-2 rounded-lg">
                  <Image
                    src="/logos/shopify.svg"
                    alt="Shopify"
                    width={48}
                    height={24}
                    className="opacity-70"
                  />
                </div>
                <div className="bg-zinc-100 p-2 rounded-lg">
                  <Image
                    src="/logos/square.svg"
                    alt="Square"
                    width={48}
                    height={24}
                    className="opacity-70"
                  />
                </div>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground font-heading font-bold">Connect your Shopify, Square and other e-commerce stores</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">Fully hosted</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">I handle everything to keep your site live 24/7</p>
          <Services />
        </div>
      </section>
      <ContactForm />
    </main>
  )
}
