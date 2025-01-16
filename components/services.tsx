import { Shield, Gauge, Cloud, ArrowUpDown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const services = [
  {
    title: "99.9% Uptime",
    description: "Your application is always available when you need it",
    icon: Gauge
  },
  {
    title: "Automatic Updates",
    description: "Security patches and system updates are handled automatically",
    icon: Shield
  },
  {
    title: "Scalable Infrastructure",
    description: "Your application grows with your business needs",
    icon: ArrowUpDown
  },
  {
    title: "Daily Backups",
    description: "Your data is always safe and can be restored if needed",
    icon: Cloud
  }
]

export default function Services() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
  )
} 