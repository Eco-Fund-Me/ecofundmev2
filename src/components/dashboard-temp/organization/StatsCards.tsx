interface StatsCardsProps {
    totalRaised: number
    backers: number
    campaigns: number
  }
  
  export function StatsCards({ totalRaised, backers, campaigns }: StatsCardsProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-black text-white border-green-500 border-2 rounded-lg p-4 md:p-6">
          <p className="text-lg md:text-xl mb-2">raised</p>
          <div className="flex items-baseline">
            <span className="text-3xl md:text-5xl font-bold text-green-500">${totalRaised.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">USD</span>
          </div>
        </div>
  
        <div className="bg-black text-white border-green-500 border-2 rounded-lg p-4 md:p-6">
          <p className="text-lg md:text-xl mb-2">from</p>
          <div className="flex items-baseline">
            <span className="text-3xl md:text-5xl font-bold text-green-500">{backers.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">backers</span>
          </div>
        </div>
  
        <div className="bg-black text-white border-green-500 border-2 rounded-lg p-4 md:p-6 sm:col-span-2 lg:col-span-1">
          <p className="text-lg md:text-xl mb-2">across</p>
          <div className="flex items-baseline">
            <span className="text-3xl md:text-5xl font-bold text-green-500">{campaigns}</span>
            <span className="ml-2 text-gray-400">campaigns</span>
          </div>
        </div>
      </div>
    )
  }
  