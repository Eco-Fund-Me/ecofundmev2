import { Suspense } from "react";
import Hero from "@/components/MarketingPage/Hero";
import HeroCampaigns from "@/components/MarketingPage/HeroCampaigns";
import HeroFeaturedCreators from "@/components/MarketingPage/HeroFeaturedCreators";
import Loading from "@/components/loading";

export default function Home() {
  return (
    <div className="w-full">
      <div className="min-h-[80vh]">
        <Suspense fallback={<Loading />}>
          <Hero />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <HeroCampaigns />
        <HeroFeaturedCreators />
      </Suspense>
    </div>
  );
}
