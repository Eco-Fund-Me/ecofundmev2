// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { PluralitySocialConnect } from "@plurality-network/smart-profile-wallet";

// export default function SignInPage() {
//   const handleDataReturned = (data: any) => {
//     console.log("Plurality data:", data);
//     // Handle the returned data from Plurality
//   };

//   const pluralityOptions = {
//     clientId: process.env.NEXT_PUBLIC_PLURALITY_CLIENT_ID || "",
//     theme: "dark",
//     text: "Sign in with Plurality",
//   };

//   return (
//     <div className="min-h-screen grid bg-[#040B08] md:grid-cols-2">
//       {/* Left Side - Hero Image */}
//       <div className="relative hidden md:block">
//         <div className="absolute inset-0 bg-black/40 z-10" />
//         <Image
//           src="/auth-hero.png"
//           alt="Green Projects"
//           fill
//           className="object-cover"
//         />
//         <div className="relative z-20 p-12 text-white mt-12 text-center">
//           <h1 className="text-5xl font-bold text-[#00EE7D]">Welcome back</h1>
//           <p className="mt-4 text-xl">
//             Continue supporting
//             <br />
//             Green Projects
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Sign In */}
//       <div className="p-8 flex flex-col justify-center">
//         <div className="max-w-md mx-auto w-full space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-[#00EE7D] md:hidden">
//               Sign in
//             </h2>
//           </div>

//           <div className="space-y-6">
//             <PluralitySocialConnect
//               options={pluralityOptions}
//               onDataReturned={handleDataReturned}
//             />

//             <p className="text-center text-sm text-gray-500">
//               Don&apos;t have an account?{" "}
//               <Link href="/sign-up" className="text-[#00EE7D] hover:underline">
//                 Sign up here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
