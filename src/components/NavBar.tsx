"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
// import { AuthPopover } from "./AuthPopover/AuthPopover";
import EmailLogin from "./login/withEmail"


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/campaigns", label: "Campaigns" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#about", label: "About Us" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <nav className="w-full border-b border-black bg-[#040B08]">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center hover:text-[#00EE7D]/80 text-[#00EE7D] space-x-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-semibold">EcofundMe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-[#00EE7D] hover:text-[#00EE7D]/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* <AuthPopover /> */}
          <EmailLogin/>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-[#00EE7D] hover:text-[#00EE7D]/80 hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full max-h-screen overflow-y-auto bg-[#040B08] border-[#00EE7D]/20"
            >
              <SheetHeader className="absolute top-6 w-full text-center">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="absolute right-4 top-0 text-[#00EE7D] hover:text-[#00EE7D]/80 hover:bg-transparent"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <div className="flex flex-col items-center justify-center space-y-6 w-full px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-[#00EE7D] hover:text-[#00EE7D]/80 transition-colors 
                      py-3 text-xl font-medium text-center w-full"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-6 w-full flex justify-center">
                  {/* <AuthPopover /> */}
                  <EmailLogin/>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
