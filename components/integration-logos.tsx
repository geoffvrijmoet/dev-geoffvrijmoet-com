import Image from "next/image"

export default function IntegrationLogos() {
  return (
    <div className="mt-4">
      <div className="bg-zinc-100/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100">
            <Image 
              src="/logos/stripe.svg" 
              alt="Stripe" 
              width={64} 
              height={24} 
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100">
            <Image 
              src="/logos/shopify.svg" 
              alt="Shopify" 
              width={80} 
              height={24} 
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100">
            <Image 
              src="/logos/square.svg" 
              alt="Square" 
              width={64} 
              height={24} 
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100">
            <Image 
              src="/logos/google-drive.svg" 
              alt="Google" 
              width={64} 
              height={24} 
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-zinc-100">
            <Image 
              src="/logos/openai.svg" 
              alt="OpenAI" 
              width={64} 
              height={24} 
              className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 