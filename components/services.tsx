import { Code2, BarChart3, Workflow } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const services = [
  {
    title: "Custom Dashboards",
    description: "Powerful interfaces to manage your business data and operations",
    icon: BarChart3
  },
  {
    title: "Integration Solutions",
    description: "Seamless connections with Square, Shopify, Stripe, and more",
    icon: Workflow
  },
  {
    title: "Custom Development",
    description: "Tailored web applications built for your specific needs",
    icon: Code2
  }
]

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <div className="mb-4">
                  <service.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 