interface CampaignProgressProps {
  targetAmount: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
}

export function CampaignProgress({
  targetAmount,
  currentAmount,
  backers,
  daysLeft,
}: CampaignProgressProps) {
  const progress = (currentAmount / targetAmount) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">{targetAmount} USD</span>
        <span className="text-sm text-gray-500">{backers} backers</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-[#00EE7D] h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          {Math.round(progress)}% of {targetAmount} ETH funded
        </span>
        <span className="text-red-500">{daysLeft} days left</span>
      </div>
    </div>
  );
}
