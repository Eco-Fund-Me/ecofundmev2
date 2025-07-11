// import { Suspense } from "react"
// import Hero from "@/components/MarketingPage/Hero"
// import HeroCampaigns from "@/components/MarketingPage/HeroCampaigns"
// import HeroFeaturedCreators from "@/components/MarketingPage/HeroFeaturedCreators"
// import Loading from "@/components/loading"
// import HowItWorks from "@/components/MarketingPage/HowItWorks"
// import Testimonials from "@/components/MarketingPage/Testimonials"
// import CallToAction from "@/components/MarketingPage/CallToAction"

// export default function Home() {
//   return (
//     <div className="w-full">
//       <div className="min-h-[90vh]">
//         <Suspense fallback={<Loading />}>
//           <Hero />
//         </Suspense>
//       </div>
//       <Suspense fallback={<Loading />}>
//         <HowItWorks />
//         <HeroCampaigns />
//         <HeroFeaturedCreators />
//         <Testimonials />
//         <CallToAction />
//       </Suspense>
//     </div>
//   )
// }
"use client"

import { Suspense, useEffect } from "react"
import Hero from "@/components/MarketingPage/Hero"
import HeroCampaigns from "@/components/MarketingPage/HeroCampaigns"
import Loading from "@/components/loading"
import HowItWorks from "@/components/MarketingPage/HowItWorks"
import Services from "@/components/MarketingPage/Services"
import Testimonials from "@/components/MarketingPage/Testimonials"
import CallToAction from "@/components/MarketingPage/CallToAction"
import { usePathname } from "next/navigation"

export default function Home() {
const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1); // removes the "#"
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay to ensure section is rendered
      }
    }
  }, [pathname]);


  return (
    <div className="w-full">
      <div className="min-h-[90vh]">
        <Suspense fallback={<Loading />}>
          <Hero />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <HeroCampaigns />
        <HowItWorks />
        <Services />
       
        {/* HeroFeaturedCreators temporarily removed */}
        <Testimonials />
        <CallToAction />
      </Suspense>
    </div>
  )
}
