import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

const projects = [
  {
    title: "Business Analytics Dashboard",
    description: "Custom dashboard with real-time data visualization",
    image: "/dashboard-preview.jpg" // You'll need to add these images
  },
  {
    title: "E-commerce Integration",
    description: "Shopify and inventory management solution",
    image: "/ecommerce-preview.jpg"
  },
  {
    title: "Automated Workflow System",
    description: "Business process automation platform",
    image: "/workflow-preview.jpg"
  }
]

export default function Portfolio() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Recent Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 