import { create } from "zustand"
import { persist } from "zustand/middleware"

export type MilestoneStatus = "pending" | "in_progress" | "completed" | "voting" | "approved" | "rejected"

export interface Milestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  estimatedCompletionDate: string
  completionProof?: string
  votes?: {
    approve: number
    reject: number
    voters: string[]
  }
}

export interface Reward {
  id: string
  name: string
  description: string
  price: number
  image?: string
  type: "digital" | "physical"
  estimatedDeliveryDate?: Date
  location?: string
  quantity?: number
  remainingQuantity?: number
}

export interface Campaign {
  id: string
  title: string
  tagline: string
  description: string
  category: string
  creatorId: string
  creatorName: string
  creatorAvatar: string
  goalAmount: number
  raisedAmount: number
  backers: number
  daysLeft: number
  coverImage: string
  milestones: Milestone[]
  rewards: Reward[]
  currentAmount: number
  targetAmount: number
  imageUrl?: string
}

interface CampaignState {
  campaigns: Campaign[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  fetchCampaigns: () => void
  categories: string[]
}

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Ocean Cleanup Initiative",
    tagline: "Removing plastic from our oceans",
    description: "A campaign to clean up plastic waste from the oceans and protect marine life.",
    category: "Blue economy",
    creatorId: "101",
    creatorName: "EcoMarine Solutions",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goalAmount: 50000,
    raisedAmount: 32500,
    backers: 215,
    daysLeft: 12,
    coverImage: "/ocean-cleanup.jpeg",
    currentAmount: 32500,
    targetAmount: 50000,
    imageUrl: "/ocean-cleanup.jpeg",
    milestones: [
      {
        id: "m1",
        title: "Equipment Acquisition",
        description: "Purchase specialized cleanup equipment and vessels",
        status: "completed",
        estimatedCompletionDate: "2023-06-15",
        completionProof:
          "We have successfully acquired all necessary equipment including 3 specialized vessels and 15 collection nets.",
        votes: {
          approve: 180,
          reject: 5,
          voters: [],
        },
      },
      {
        id: "m2",
        title: "First Cleanup Operation",
        description: "Conduct first major cleanup operation in Pacific garbage patch",
        status: "voting",
        estimatedCompletionDate: "2023-09-30",
        completionProof:
          "Our team has completed the first cleanup operation, collecting over 5 tons of plastic waste. See attached photos and documentation.",
        votes: {
          approve: 95,
          reject: 12,
          voters: [],
        },
      },
      {
        id: "m3",
        title: "Recycling Partnership",
        description: "Establish partnerships with recycling facilities",
        status: "in_progress",
        estimatedCompletionDate: "2023-12-15",
      },
      {
        id: "m4",
        title: "Education Program Launch",
        description: "Launch educational program about ocean conservation",
        status: "pending",
        estimatedCompletionDate: "2024-02-28",
      },
    ],
    rewards: [
      {
        id: "r1",
        name: "Digital Ocean Cleanup Guide",
        description: "A comprehensive digital guide on ocean conservation and cleanup methods",
        price: 15,
        type: "digital",
      },
      {
        id: "r2",
        name: "Ocean Cleanup T-Shirt",
        description: "Eco-friendly t-shirt made from recycled ocean plastic",
        price: 35,
        type: "physical",
        estimatedDeliveryDate: new Date("2023-12-15"),
        location: "123 Ocean Ave, Beach City, CA",
        quantity: 100,
        remainingQuantity: 68,
        image: "/ocean-cleanup-t-shirt.png",
      },
      {
        id: "r3",
        name: "Cleanup Expedition Photos",
        description: "Digital photo collection from our cleanup expeditions",
        price: 25,
        type: "digital",
        image: "/ocean-cleanup-effort.png",
      },
    ],
  },
  {
    id: "2",
    title: "Sustainable Urban Gardens",
    tagline: "Green spaces in urban environments",
    description: "Creating sustainable gardens in urban areas to improve air quality and provide fresh produce.",
    category: "green infrastructure",
    creatorId: "102",
    creatorName: "Urban Green",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goalAmount: 25000,
    raisedAmount: 18750,
    backers: 124,
    daysLeft: 8,
    coverImage: "/recycling-plant.jpeg",
    currentAmount: 18750,
    targetAmount: 25000,
    imageUrl: "/recycling-plant.jpeg",
    milestones: [
      {
        id: "m1",
        title: "Site Selection",
        description: "Identify and secure locations for urban gardens",
        status: "completed",
        estimatedCompletionDate: "2023-05-20",
        completionProof: "We have secured 5 locations across the city for our urban gardens.",
        votes: {
          approve: 110,
          reject: 2,
          voters: [],
        },
      },
      {
        id: "m2",
        title: "Garden Construction",
        description: "Build garden infrastructure and prepare soil",
        status: "completed",
        estimatedCompletionDate: "2023-07-15",
        completionProof: "All garden infrastructure has been built and soil preparation is complete.",
        votes: {
          approve: 98,
          reject: 8,
          voters: [],
        },
      },
      {
        id: "m3",
        title: "Planting Phase",
        description: "Plant initial crops and establish maintenance routines",
        status: "in_progress",
        estimatedCompletionDate: "2023-10-30",
      },
    ],
    rewards: [
      {
        id: "r1",
        name: "Urban Gardening eBook",
        description: "Digital guide to starting your own urban garden",
        price: 10,
        type: "digital",
        image: "/urban-gardening-ebook.png",
      },
      {
        id: "r2",
        name: "Seed Starter Kit",
        description: "Everything you need to start growing your own vegetables",
        price: 30,
        type: "physical",
        estimatedDeliveryDate: new Date("2023-11-10"),
        location: "456 Garden St, Green City, NY",
        quantity: 50,
        remainingQuantity: 22,
        image: "/placeholder-vyljj.png",
      },
      {
        id: "r3",
        name: "Garden Plot Sponsorship",
        description: "Sponsor a plot in one of our urban gardens with your name on a plaque",
        price: 100,
        type: "physical",
        estimatedDeliveryDate: new Date("2024-01-15"),
        location: "Multiple locations across the city",
        image: "/garden-plot.png",
      },
    ],
  },
  {
    id: "3",
    title: "Solar Power for Schools",
    tagline: "Renewable energy education",
    description:
      "Installing solar panels in schools to reduce energy costs and educate students about renewable energy.",
    category: "Renewable Energy",
    creatorId: "103",
    creatorName: "SolarEd",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goalAmount: 75000,
    raisedAmount: 45000,
    backers: 310,
    daysLeft: 21,
    coverImage: "/solar-panel.jpg",
    currentAmount: 45000,
    targetAmount: 75000,
    imageUrl: "/solar-panel.jpg",
    milestones: [
      {
        id: "m1",
        title: "School Selection",
        description: "Select participating schools based on need and suitability",
        status: "completed",
        estimatedCompletionDate: "2023-04-10",
        completionProof: "We have selected 10 schools for the initial phase of the project.",
        votes: {
          approve: 290,
          reject: 5,
          voters: [],
        },
      },
      {
        id: "m2",
        title: "System Design",
        description: "Design solar power systems for each school",
        status: "completed",
        estimatedCompletionDate: "2023-06-30",
        completionProof: "All system designs have been completed and approved by engineers.",
        votes: {
          approve: 275,
          reject: 12,
          voters: [],
        },
      },
      {
        id: "m3",
        title: "Installation",
        description: "Install solar panels and power systems",
        status: "in_progress",
        estimatedCompletionDate: "2023-11-15",
      },
      {
        id: "m4",
        title: "Curriculum Development",
        description: "Develop educational materials about solar energy",
        status: "in_progress",
        estimatedCompletionDate: "2023-12-20",
      },
    ],
    rewards: [
      {
        id: "r1",
        name: "Solar Energy Learning Kit",
        description: "Digital educational materials about solar energy",
        price: 20,
        type: "digital",
        image: "/solar-energy-learning.png",
      },
      {
        id: "r2",
        name: "Solar-Powered Charger",
        description: "Portable solar charger for your devices",
        price: 45,
        type: "physical",
        estimatedDeliveryDate: new Date("2023-12-01"),
        location: "789 Solar Blvd, Sunny City, CA",
        quantity: 200,
        remainingQuantity: 143,
        image: "/placeholder.svg?height=200&width=200&query=solar charger",
      },
      {
        id: "r3",
        name: "School Sponsorship",
        description: "Your name on a plaque at one of our solar-powered schools",
        price: 250,
        type: "physical",
        estimatedDeliveryDate: new Date("2024-02-28"),
        location: "Various school locations",
        image: "/placeholder.svg?height=200&width=200&query=school solar panel",
      },
    ],
  },
]

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
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
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      fetchCampaigns: () => set({ campaigns: mockCampaigns }),
    }),
    {
      name: "campaign-storage",
    },
  ),
)
