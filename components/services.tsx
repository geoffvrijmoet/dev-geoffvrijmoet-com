import { MessageSquare, Cloud, Workflow } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import IntegrationLogos from "./integration-logos"

const services = [
  {
    title: "1-on-1 support",
    description: "We come up with your perfect solution together",
    icon: MessageSquare
  },
  {
    title: "Integrations available",
    description: "I seamlessly connect your accounts so you can focus on operations",
    icon: Workflow,
    extra: <IntegrationLogos />
  },
  {
    title: "Fully hosted",
    description: "I handle everything to keep your site live 24/7",
    icon: Cloud
  }
]

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <div className="mb-4">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                {service.extra}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 