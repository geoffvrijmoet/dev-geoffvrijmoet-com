import Hero from "@/components/hero"
import DashboardDemo from "@/components/dashboard-demo"
import Services from "@/components/services"
import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DashboardDemo />
      <Services />
      <ContactForm />
    </main>
  )
}
