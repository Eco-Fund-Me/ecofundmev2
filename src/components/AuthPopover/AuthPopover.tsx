// "use client";

// import { useState, useEffect } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import PluralityConnect from "@/components/PluralityConnect";
// import Link from "next/link";
// import Image from "next/image";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { pluralityHelpers } from "@/lib/plurality";
// import { PluralitySocialConnect } from "@plurality-network/smart-profile-wallet";

// interface LoginInfo {
//   status?: string;
//   pluralityToken?: string;
// }

// interface ProfileData {
//   data: {
//     rows: {
//       username?: string;
//       avatar?: string;
//       bio?: string;
//       connectedPlatforms?: string[];
//     }[];
//   };
// }


// export function AuthPopover() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<{
//     name: string;
//     avatar: string;
//     bio: string;
//     connectedPlatforms: string[];
//   } | null>(null);

//   useEffect(() => {
//     setMounted(true);
//     const checkUser = async () => {
//       try {
//         setIsLoading(true);
//         // First check login status
//       const loginInfo: LoginInfo | null = await PluralitySocialConnect.getLoginInfo() as LoginInfo | null;

//         if (loginInfo?.status && loginInfo?.pluralityToken) {
//           // Then get profile data
//         const profileData: ProfileData | null =
//             await PluralitySocialConnect.getSmartProfileData()  as ProfileData | null;;
//           console.log("Profile Data in AuthPopover:", profileData);

//           if (profileData?.data?.rows?.[0]) {
//             const userData = profileData.data.rows[0];
//             setUser({
//               name: userData.username || "Anonymous",
//               avatar: userData.avatar || "/avatar.png",
//               bio: userData.bio || "",
//               connectedPlatforms: userData.connectedPlatforms || [],
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error checking user:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (!mounted) return null;
//   if (isLoading)
//     return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;

//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         {user ? (
//           <Button
//             className="bg-transparent hover:bg-transparent p-0 sm:p-2 transition-all duration-200"
//             aria-label="Open user menu"
//           >
//             <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback>{user.name[0]}</AvatarFallback>
//             </Avatar>
//           </Button>
//         ) : (
//           <Button
//             className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 hover:scale-105 
//               transition-all duration-300 px-4 py-2 text-sm font-semibold rounded-full"
//           >
//             Login / Sign Up
//           </Button>
//         )}
//       </PopoverTrigger>

//       <PopoverContent
//         className="w-[320px] sm:w-[400px] p-3 sm:p-4 bg-[#040B08] border-[#00EE7D]/20"
//         align="end"
//         sideOffset={8}
//       >
//         {user ? (
//           <div className="space-y-4 sm:space-y-6">
//             <div className="flex items-center space-x-3">
//               <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback>{user.name[0]}</AvatarFallback>
//               </Avatar>
//               <div className="space-y-1">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
//                   <p className="text-sm sm:text-base font-medium text-white">
//                     Connected with Plurality
//                   </p>
//                   <Image
//                     src="/plurality-logo.png"
//                     alt="Plurality Logo"
//                     width={80}
//                     height={25}
//                     className="h-5 sm:h-6 w-auto"
//                   />
//                 </div>
//                 <p className="text-sm text-[#00EE7D] font-medium">
//                   {user.name}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
//               <div className="w-full">
//                 <PluralityConnect />
//               </div>

//               <Link href="/dashboard" className="w-full">
//                 <Button
//                   className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/80 
//                     text-sm sm:text-base py-4 sm:py-5 transition-colors duration-200"
//                 >
//                   Dashboard
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="text-center">
//               <h3 className="text-lg font-medium text-white mb-2">
//                 Welcome to EcofundMe
//               </h3>
//               <p className="text-sm text-gray-400">
//                 Connect with Plurality to get started
//               </p>
//             </div>
//             <PluralityConnect />
//           </div>
//         )}
//       </PopoverContent>
//     </Popover>
//   );
// }
