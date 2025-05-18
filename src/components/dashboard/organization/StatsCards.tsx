import { Card, CardContent } from "@/components/ui/card"

interface StatsCardsProps {
  data: {
    totalRaised: number
    backers: number
    campaigns: number
  }
}

export function StatsCards({ data }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-black text-white border-green-500 border-2">
        <CardContent className="p-6">
          <p className="text-xl mb-2">raised</p>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-green-500">${data.totalRaised.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">USD</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500 border-2">
        <CardContent className="p-6">
          <p className="text-xl mb-2">from</p>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-green-500">{data.backers.toLocaleString()}</span>
            <span className="ml-2 text-gray-400">backers</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black text-white border-green-500 border-2">
        <CardContent className="p-6">
          <p className="text-xl mb-2">across</p>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-green-500">{data.campaigns}</span>
            <span className="ml-2 text-gray-400">campaigns</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
