import Image from "next/image"

export default function IntegrationLogos() {
  const logos = [
    { src: "/logos/stripe.svg", alt: "Stripe", width: 64 },
    { src: "/logos/shopify.svg", alt: "Shopify", width: 80 },
    { src: "/logos/square.svg", alt: "Square", width: 64 },
    { src: "/logos/google-drive.svg", alt: "Google", width: 64 },
    { src: "/logos/openai.svg", alt: "OpenAI", width: 64 },
  ]

  return (
    <div className="mt-4">
      <div className="bg-zinc-100/80 backdrop-blur-sm py-6 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 gap-8 items-center">
          {logos.map((logo) => (
            <div key={logo.alt} className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100 flex-shrink-0">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={logo.width} 
                height={24} 
                className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 