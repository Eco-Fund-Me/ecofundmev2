interface CampaignProgressProps {
  targetAmount: number
  currentAmount: number
  backers: number
  daysLeft: number
}

export function CampaignProgress({ targetAmount, currentAmount, backers, daysLeft }: CampaignProgressProps) {
  const progress = (currentAmount / targetAmount) * 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-[#1E3A29]">{targetAmount} USD</span>
        <span className="text-sm text-[#5A7D6A]">{backers} backers</span>
      </div>

      <div className="w-full bg-[#E8E4D8] h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-[#4CAF50] h-2.5 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-[#5A7D6A]">{Math.round(progress)}% funded</span>
        <span className="text-[#4CAF50] font-medium">{daysLeft} days left</span>
      </div>
    </div>
  )
}
