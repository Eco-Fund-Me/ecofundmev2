"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { HeroLoading } from "../HeroLoading";

function HeroContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[80vh] container overflow-hidden">
      <div
        className="absolute inset-0 bg-[#040B08]"
        style={{ minHeight: "80vh" }}
      />
      <Image
        src="/hero-banner.png"
        alt="Hero Banner"
        fill
        className="object-cover brightness-75"
        priority
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
          minHeight: "80vh",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"
        style={{ minHeight: "80vh" }}
      />
      <div className="container relative h-full min-h-[80vh] flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Funding Green Projects with{" "}
            <span className="text-[#00EE7D]">Trust & Transparency</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            EcofundMe is a Web3-powered, tokenized climate financing platform
            that connects donors with impactful carbon mitigation
            projects—ensuring transparency, accountability, and rewards for
            every contribution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 md:pt-8">
            <Link href="/campaigns" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 hover:scale-105 
                  transition-all duration-300 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold rounded-full 
                  shadow-lg shadow-[#00EE7D]/20"
              >
                <Compass className="w-5 h-5 mr-2" />
                Explore Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <Suspense fallback={<HeroLoading />}>
      <HeroContent />
    </Suspense>
  );
}
