import { Suspense } from "react"
import Hero from "@/components/MarketingPage/Hero"
import HeroCampaigns from "@/components/MarketingPage/HeroCampaigns"
import HeroFeaturedCreators from "@/components/MarketingPage/HeroFeaturedCreators"
import Loading from "@/components/loading"
import HowItWorks from "@/components/MarketingPage/HowItWorks"
import Testimonials from "@/components/MarketingPage/Testimonials"
import CallToAction from "@/components/MarketingPage/CallToAction"

export default function Home() {
  return (
    <div className="w-full">
      <div className="min-h-[90vh]">
        <Suspense fallback={<Loading />}>
          <Hero />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <HowItWorks />
        <HeroCampaigns />
        <HeroFeaturedCreators />
        <Testimonials />
        <CallToAction />
      </Suspense>
    </div>
  )
}
