interface CampaignRiskProps {
  disclosure: string
}

export function CampaignRisk({ disclosure }: CampaignRiskProps) {
  return (
    <div className="text-sm text-gray-500">
      <p>Risk involved: {disclosure}</p>
    </div>
  )
}
