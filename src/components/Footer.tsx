import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#040B08] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Company Name */}
          <Link
            href="#"
            className="flex items-center hover:text-[#00EE7D]/80 text-[#00EE7D] space-x-2 mb-4 md:mb-0"
          >
            <Image
              src="/logo.png"
              alt="EcoFundMe Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-semibold">EcoFundMe</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              Campaigns
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              About us
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              Blog
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              Help
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-[#00EE7D] transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-sm text-gray-400">
          copyright © 2025 EcoFundMe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
