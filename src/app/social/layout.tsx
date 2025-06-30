// import type React from "react"
// import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "EcoFundMe Social",
//   description: "Connect with eco-conscious creators and campaigns",
// }

// export default function SocialLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return <div className="min-h-screen bg-gray-50">{children}</div>
// }
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
  description: "Test",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}