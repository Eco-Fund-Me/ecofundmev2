import type { ReactNode } from "react"

export default function CampaignLayout({
  children,
  milestone,
}: {
  children: ReactNode
  milestone: ReactNode
}) {
  return (
    <>
      {children}
      {milestone}
    </>
  )
}
