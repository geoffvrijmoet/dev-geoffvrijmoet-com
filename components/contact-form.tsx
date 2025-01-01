"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you soon.",
        })
        ;(e.target as HTMLFormElement).reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Something went wrong: ${error}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Let&apos;s Work Together</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input name="name" placeholder="Your Name" required />
            </div>
            <div>
              <Input name="email" type="email" placeholder="Your Email" required />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Tell me about your project"
                className="min-h-[150px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
} 