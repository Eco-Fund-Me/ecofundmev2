export const mockUserData = {
    name: "Justice Smith",
    email: "justice.smith@example.com",
    avatar: "/diverse-avatars.png",
    walletAddress: "0x1234...5678",
    stats: {
      donated: 315.0,
      rewards: 27.0,
      campaignsBacked: 5,
    },
  }
  
  export const mockBackedCampaigns = [
    {
      id: "1",
      title: "Sustainable Urban Garden Initiative",
      creator: "EcoGrowth Foundation",
      amountDonated: 55.0,
      status: "ongoing",
      etaDays: 48,
      image: "/sustainable-garden.png",
    },
    {
      id: "2",
      title: "Clean Ocean Plastic Removal",
      creator: "Ocean Cleanup Collective",
      amountDonated: 55.0,
      status: "funded",
      etaDays: 10,
      image: "/ocean-cleanup-effort.png",
    },
    {
      id: "3",
      title: "Renewable Energy for Rural Schools",
      creator: "Education First NGO",
      amountDonated: 55.0,
      status: "canceled",
      etaDays: null,
      image: "/solar-panels-school.png",
    },
    {
      id: "4",
      title: "Wildlife Conservation Project",
      creator: "Nature Preservation Trust",
      amountDonated: 75.0,
      status: "ongoing",
      etaDays: 30,
      image: "/wildlife-conservation-mosaic.png",
    },
    {
      id: "5",
      title: "Reforestation Initiative",
      creator: "Green Earth Alliance",
      amountDonated: 75.0,
      status: "funded",
      etaDays: 0,
      image: "/reforestation-effort.png",
    },
  ]
  
  export const mockNotifications = [
    {
      id: "1",
      title: "Campaign Funded",
      message: "Clean Ocean Plastic Removal has been successfully funded!",
      date: "2023-05-15T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      title: "New Reward Available",
      message: "You've earned a new reward from EcoGrowth Foundation",
      date: "2023-05-10T14:45:00Z",
      read: true,
    },
    {
      id: "3",
      title: "Campaign Update",
      message: "Sustainable Urban Garden Initiative has posted a new update",
      date: "2023-05-05T09:15:00Z",
      read: true,
    },
  ]
  