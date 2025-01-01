"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
            Custom Web Solutions for Your Business
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Specialized in building powerful dashboards and automated business solutions
          </p>
          <Button size="lg" className="text-lg">
            See My Work
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 