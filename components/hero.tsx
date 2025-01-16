"use client"

import { motion } from "framer-motion"

const titleWords = [
  { text: "I", hasTile: false },
  { text: "make", hasTile: false },
  { text: "custom", hasTile: true, color: "bg-rose-50/80" },
  { text: "web", hasTile: true, color: "bg-amber-50/80" },
  { text: "apps", hasTile: true, color: "bg-emerald-50/80" },
  { text: "for", hasTile: false },
  { text: "businesses", hasTile: false }
]

export default function Hero() {
  return (
    <section className="py-16 md:py-20 flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6 flex flex-wrap justify-center gap-4">
            {titleWords.map(({ text, hasTile, color }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.2, 0.65, 0.3, 0.9]
                }}
                className={`${hasTile ? `${color} backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-zinc-200/50` : ""}`}
              >
                {text}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  )
} 