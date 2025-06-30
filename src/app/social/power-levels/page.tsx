"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Crown, Star, Users, TrendingUp, Target, Award, Coins, ArrowRight, CheckCircle } from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import Link from "next/link"

const powerLevels = [
  {
    level: "1-19",
    title: "Eco Newcomer",
    color: "text-gray-600 bg-gray-100",
    voteWeight: "10-25%",
    benefits: [
      "Basic posting and voting",
      "Access to general discussions",
      "Can join public campaigns",
      "Basic profile customization",
    ],
    requirements: "Join the platform and start engaging",
  },
  {
    level: "20-39",
    title: "Eco Supporter",
    color: "text-yellow-600 bg-yellow-100",
    voteWeight: "25-40%",
    benefits: [
      "Can boost posts (limited)",
      "Monthly rewards eligible",
      "Access to supporter channels",
      "Enhanced profile features",
      "Can create basic polls",
    ],
    requirements: "Consistent posting and positive community engagement",
  },
  {
    level: "40-59",
    title: "Eco Advocate",
    color: "text-green-600 bg-green-100",
    voteWeight: "40-60%",
    benefits: [
      "Can create campaign servers",
      "Higher earnings multiplier (1.5x)",
      "Advocate-only spaces access",
      "Can host small events",
      "Advanced analytics access",
    ],
    requirements: "Quality content creation and community building",
  },
  {
    level: "60-79",
    title: "Eco Champion",
    color: "text-blue-600 bg-blue-100",
    voteWeight: "60-80%",
    benefits: [
      "Moderation privileges",
      "Can host live events",
      "Priority in spaces",
      "Revenue sharing program",
      "Champion badge display",
    ],
    requirements: "Leadership in environmental initiatives",
  },
  {
    level: "80-100",
    title: "Eco Legend",
    color: "text-purple-600 bg-purple-100",
    voteWeight: "80-100%",
    benefits: [
      "Platform governance participation",
      "Maximum revenue sharing",
      "Direct platform team access",
      "Legend status recognition",
      "Can mentor new users",
    ],
    requirements: "Exceptional contributions to the platform and environment",
  },
]

const earningMechanics = [
  {
    title: "Post Rewards",
    description: "Earn based on upvotes and engagement",
    formula: "Base Reward × Vote Weight × Content Quality Score",
    example: "$10 × 0.75 × 1.2 = $9.00",
  },
  {
    title: "Curation Rewards",
    description: "Early upvotes on trending content",
    formula: "Post Earnings × Curation Percentage × Your Vote Weight",
    example: "$50 × 0.25 × 0.60 = $7.50",
  },
  {
    title: "Comment Rewards",
    description: "Quality engagement rewards",
    formula: "Base Comment Reward × Engagement Score",
    example: "$2 × 1.5 = $3.00",
  },
  {
    title: "Monthly Bonuses",
    description: "Rank-based competition rewards",
    formula: "Fixed Prize Pool ÷ Top Performers",
    example: "Top 10: $50-500 each",
  },
]

const monthlyCompetitions = [
  {
    title: "Top Creator",
    prize: "$500",
    description: "Highest earning content creator",
    icon: Crown,
  },
  {
    title: "Community Champion",
    prize: "$300",
    description: "Most helpful community member",
    icon: Users,
  },
  {
    title: "Best Curator",
    prize: "$200",
    description: "Best at finding trending content early",
    icon: TrendingUp,
  },
  {
    title: "Rising Star",
    prize: "$100",
    description: "Fastest growing new member",
    icon: Star,
  },
]

export default function PowerLevelsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-[#00EE7D]" />
            <h1 className="text-4xl font-bold">Power Level System</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn power through quality contributions, environmental advocacy, and community engagement. Higher power
            levels unlock better rewards and platform privileges.
          </p>
        </div>

        {/* Power Levels Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Power Level Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {powerLevels.map((level, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${level.color} font-semibold`}>Level {level.level}</Badge>
                    <div className="text-sm font-medium text-gray-600">Vote: {level.voteWeight}</div>
                  </div>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {level.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>How to reach:</strong> {level.requirements}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How Power Levels Work */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6" />
              How Power Levels Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Gaining Power</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00EE7D]" />
                    Quality posts that get upvoted
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00EE7D]" />
                    Helpful comments and engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00EE7D]" />
                    Supporting environmental campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00EE7D]" />
                    Consistent daily activity
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#00EE7D]" />
                    Community leadership and mentoring
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Vote Weight Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Your vote on a $100 post:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Level 10 (15% weight):</span>
                      <span className="font-semibold">$15 impact</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Level 50 (50% weight):</span>
                      <span className="font-semibold">$50 impact</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Level 90 (90% weight):</span>
                      <span className="font-semibold">$90 impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earning Mechanics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Coins className="h-6 w-6" />
            Earning Mechanics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earningMechanics.map((mechanic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{mechanic.title}</CardTitle>
                  <p className="text-gray-600">{mechanic.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <div className="text-sm font-mono">{mechanic.formula}</div>
                  </div>
                  <div className="text-sm">
                    <strong>Example:</strong> {mechanic.example}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Competitions */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6" />
              Monthly Competitions
            </CardTitle>
            <p className="text-gray-600">Compete for additional rewards based on your contributions and achievements</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthlyCompetitions.map((competition, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <competition.icon className="h-8 w-8 mx-auto mb-2 text-[#00EE7D]" />
                  <h3 className="font-semibold mb-1">{competition.title}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-2">{competition.prize}</div>
                  <p className="text-sm text-gray-600">{competition.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Zap className="h-12 w-12 text-[#00EE7D] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of environmental advocates and start building your power level today. Every post, vote,
              and contribution helps create a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/social/feed">
                <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Start Posting</Button>
              </Link>
              <Link href="/social/servers">
                <Button variant="outline">Join Campaigns</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
