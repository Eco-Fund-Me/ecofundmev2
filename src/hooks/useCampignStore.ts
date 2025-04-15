import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Campaign {
  id: string
  title: string
  category: string
  creatorName: string
  targetAmount: number
  currentAmount: number
  daysLeft: number
  imageUrl: string
}

interface CampaignStore {
  campaigns: Campaign[]
  selectedCategory: string
  categories: string[]
  filteredCampaigns: Campaign[]
  setSelectedCategory: (category: string) => void
  fetchCampaigns: () => Promise<void>
  filterCampaigns: () => void
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      campaigns: [],
      selectedCategory: "All Categories",
      categories: [
        "All Categories",
        "Renewable Energy",
        "Blue economy",
        "Circular economy",
        "green infrastructure",
        "Waste Management and Recycling",
        "De-Fi",
        "NFTs & Collectibles",
      ],
      filteredCampaigns: [],
      setSelectedCategory: (category) => {
        set({ selectedCategory: category })
        get().filterCampaigns()
      },
      filterCampaigns: () => {
        const { campaigns, selectedCategory } = get()
        const filtered =
          selectedCategory === "All Categories"
            ? campaigns
            : campaigns.filter((campaign) => campaign.category === selectedCategory)
        set({ filteredCampaigns: filtered })
      },
      fetchCampaigns: async () => {
        try {
          // TODO: Replace with actual API call
          const mockCampaigns = [
            {
              id: "1",
              title: "Solar Panel Initiative",
              category: "Renewable Energy",
              creatorName: "Green Energy Co",
              targetAmount: 0.006,
              currentAmount: 0.00066,
              daysLeft: 9,
              imageUrl: "/placeholder.jpg",
            },
            {
              id: "2",
              title: "Ocean Cleanup Project",
              category: "Blue economy",
              creatorName: "Ocean Care",
              targetAmount: 0.008,
              currentAmount: 0.003,
              daysLeft: 15,
              imageUrl: "/placeholder.jpg",
            },
            {
              id: "3",
              title: "Recycling Plant",
              category: "Waste Management and Recycling",
              creatorName: "EcoRecycle",
              targetAmount: 0.01,
              currentAmount: 0.005,
              daysLeft: 20,
              imageUrl: "/placeholder.jpg",
            },
          ]
          set({ campaigns: mockCampaigns, filteredCampaigns: mockCampaigns })
        } catch (error) {
          console.error("Error fetching campaigns:", error)
        }
      },
    }),
    {
      name: "campaign-store",
    },
  ),
)
