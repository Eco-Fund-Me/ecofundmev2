/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PluralitySocialConnect } from "@plurality-network/smart-profile-wallet";
import { useState } from "react";
import { User, Building2 } from "lucide-react";

export default function SignUpPage() {
  const [selectedType, setSelectedType] = useState<
    "user" | "organization" | null
  >(null);

  const handleDataReturned = (data: any) => {
    console.log("Plurality data:", data);
    // Handle the returned data from Plurality
  };

  const pluralityOptions = {
    clientId: process.env.NEXT_PUBLIC_PLURALITY_CLIENT_ID || "",
    theme: "dark",
    text: "Continue with Plurality",
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#040B08] overflow-auto">
      {/* Left Side - Hero Image */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/auth-hero.png"
          alt="Green Projects"
          fill
          className="object-cover"
        />
        <div className="relative z-20 p-12 text-white text-center mt-12">
          <h1 className="text-5xl font-bold text-[#00EE7D]">
            Create your account
          </h1>
          <p className="mt-4 text-xl">
            To fund Green Projects with
            <br />
            Trust & Transparency
          </p>
        </div>
      </div>

      {/* Right Side - Sign Up Options */}
      <div className="p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#00EE7D] md:hidden">
              Sign up
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card
              className={`p-6 cursor-pointer transition-all hover:border-[#00EE7D] ${
                selectedType === "user"
                  ? "border-[#00EE7D] bg-[#00EE7D]/10"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedType("user")}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#00EE7D]/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-[#00EE7D]" />
                </div>
                <h3 className="font-semibold">Join as a User</h3>
                <p className="text-sm text-gray-500">
                  Support green projects and track your impact
                </p>
              </div>
            </Card>

            <Card
              className={`p-6 cursor-pointer transition-all hover:border-[#00EE7D] ${
                selectedType === "organization"
                  ? "border-[#00EE7D] bg-[#00EE7D]/10"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedType("organization")}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#00EE7D]/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-[#00EE7D]" />
                </div>
                <h3 className="font-semibold">Join as an Organization</h3>
                <p className="text-sm text-gray-500">
                  Create campaigns and raise funds
                </p>
              </div>
            </Card>
          </div>

          {selectedType && (
            <div className="mt-6">
              <PluralitySocialConnect
                options={pluralityOptions}
                onDataReturned={handleDataReturned}
              />
            </div>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#00EE7D] hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
