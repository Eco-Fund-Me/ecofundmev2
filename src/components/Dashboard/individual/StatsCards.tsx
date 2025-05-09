interface StatsCardsProps {
    donated: number
    rewards: number
    campaigns: number
  }
  
  export function StatsCards({ donated, rewards, campaigns }: StatsCardsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-black text-white rounded-lg p-6">
          <p className="text-xl mb-2">donated</p>
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-bold text-green-500">${donated.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">USD</span>
          </div>
        </div>
  
        <div className="bg-black text-white rounded-lg p-6">
          <p className="text-xl mb-2">rewards</p>
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-bold text-green-500">${rewards.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">USD</span>
          </div>
        </div>
  
        <div className="bg-black text-white rounded-lg p-6">
          <p className="text-xl mb-2">across</p>
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-bold text-green-500">{campaigns}</span>
            <span className="ml-2 text-gray-400">campaigns</span>
          </div>
        </div>
      </div>
    )
  }
  