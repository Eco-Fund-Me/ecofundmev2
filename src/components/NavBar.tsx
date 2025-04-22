// "use client"

// import type React from "react"

// import Link from "next/link"
// import Image from "next/image"
// import { Menu, X, UserPlus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet"
// import { useState, useEffect } from "react"
// // import { AuthPopover } from "./AuthPopover/AuthPopover"
// import EmailLogin from "@/components/login/withEmail"

// export default function NavBar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const navLinks = [
//     { href: "/campaigns", label: "Campaigns" },
//     { href: "#how-it-works", label: "How it Works" },
//     { href: "#about", label: "About Us" },
//   ]

//   const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     if (href.startsWith("#")) {
//       e.preventDefault()
//       const element = document.querySelector(href)
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" })
//       }
//       setIsOpen(false)
//     }
//   }

//   if (!mounted) return null

//   return (
//     <header>
//       <nav className="w-full border-b border-black bg-[#040B08]">
//         <div className="container flex h-16 items-center justify-between">
//           <Link href="/" className="flex items-center hover:text-[#00EE7D]/80 text-[#00EE7D] space-x-2">
//             <Image
//               src="/logo.png"
//               alt="Logo"
//               width={64}
//               height={40}
//               className="object-contain"
//               priority
//             />
//             <span className="text-xl font-semibold">EcoFundMe</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={(e) => handleScroll(e, link.href)}
//                 className="text-[#00EE7D] hover:text-[#00EE7D]/80 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link href="/business-verification">
//               <Button
//                 variant="outline"
//                 className="border-[#00EE7D] text-[#00EE7D] hover:bg-[#00EE7D]/10 hover:text-[#00EE7D] mr-2"
//               >
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 Sign Up
//               </Button>
//             </Link>
//             <EmailLogin label="Sign In" />
//           </div>

//           {/* Mobile Navigation */}
//           <div className="md:hidden">
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" className="text-[#00EE7D] hover:text-[#00EE7D]/80 hover:bg-transparent">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="top" className="w-full max-h-screen overflow-y-auto bg-[#040B08] border-[#00EE7D]/20">
//                 <SheetHeader className="absolute top-6 w-full text-center">
//                   <SheetClose asChild>
//                     <Button
//                       variant="ghost"
//                       className="absolute right-4 top-0 text-[#00EE7D] hover:text-[#00EE7D]/80 hover:bg-transparent"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <X className="h-6 w-6" />
//                     </Button>
//                   </SheetClose>
//                 </SheetHeader>
//                 <div className="flex flex-col items-center justify-center space-y-6 w-full px-4 pt-16">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={(e) => handleScroll(e, link.href)}
//                       className="text-[#00EE7D] hover:text-[#00EE7D]/80 transition-colors 
//                         py-3 text-xl font-medium text-center w-full"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                   <Link href="/business-verification" className="w-full">
//                     <Button
//                       variant="outline"
//                       className="border-[#00EE7D] text-[#00EE7D] hover:bg-[#00EE7D]/10 hover:text-[#00EE7D] w-full"
//                     >
//                       <UserPlus className="mr-2 h-4 w-4" />
//                       Sign Up
//                     </Button>
//                   </Link>
//                   <div className="pt-4 w-full flex justify-center">
//                     <EmailLogin label="Sign In" />
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }


"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Menu,  UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import EmailLogin from "@/components/login/withEmail"
import { useActiveAccount } from "thirdweb/react"
import { isAddress } from "thirdweb"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const account = useActiveAccount()
  const address = account? account.address :""

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/campaigns", label: "Campaigns" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#about", label: "About Us" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setIsOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1E3A29]/95 backdrop-blur-md" : "bg-transparent"}`}
    >
      <nav className="w-full border-b border-[#4CAF50]/10">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center hover:text-[#4CAF50]/80 text-[#4CAF50] space-x-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight">EcoFundMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-[#4CAF50] hover:text-[#4CAF50]/80 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-3">
              {
                !isAddress(address) &&
              <Link href="/business-verification">
                <Button
                  variant="outline"
                  className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] rounded-full px-5 bg-white/5"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>

}
              <EmailLogin label="Sign In" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-[#4CAF50] hover:text-[#4CAF50]/80 hover:bg-transparent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85%] max-h-screen overflow-y-auto bg-[#1E3A29] border-[#4CAF50]/20"
              >
                <SheetHeader className="absolute top-6 right-4">
                
                    {/* <Button
                      variant="ghost"
                      className="text-[#4CAF50] hover:text-[#4CAF50]/80 hover:bg-transparent"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button> */}
                 
                </SheetHeader>
                <div className="flex flex-col items-start justify-center space-y-6 w-full px-4 pt-16">
                  <Link href="/" className="flex items-center hover:text-[#4CAF50]/80 text-[#4CAF50] space-x-2 mb-6">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight">EcoFundMe</span>
                  </Link>

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-[#4CAF50] hover:text-[#4CAF50]/80 transition-colors 
                        py-3 text-xl font-medium w-full border-b border-[#4CAF50]/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-6 w-full space-y-4">
                    <Link href="/business-verification" className="w-full block">
                      <Button
                        variant="outline"
                        className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] w-full rounded-full bg-white/5"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                    <div className="flex justify-center w-full">
                      <EmailLogin label="Sign In" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
