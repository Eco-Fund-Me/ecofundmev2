"use client";

import { CreatorCard } from "./CreatorCard";

// Dummy data for featured creators
const featuredCreators = [
  {
    id: "1",
    name: "Creator name",
    description:
      "About creator explaining in 2 lines About creator explaining in 2 lines About creator explaining in 2 lines",
    imageUrl: "/placeholder-creator.jpg",
  },
  {
    id: "2",
    name: "Creator name",
    description:
      "About creator explaining in 2 lines About creator explaining in 2 lines About creator explaining in 2 lines",
    imageUrl: "/placeholder-creator.jpg",
  },
  {
    id: "3",
    name: "Creator name",
    description:
      "About creator explaining in 2 lines About creator explaining in 2 lines About creator explaining in 2 lines",
    imageUrl: "/placeholder-creator.jpg",
  },
  {
    id: "4",
    name: "Creator name",
    description:
      "About creator explaining in 2 lines About creator explaining in 2 lines About creator explaining in 2 lines",
    imageUrl: "/placeholder-creator.jpg",
  },
];

export default function HeroFeaturedCreators() {
  return (
    <div id="about" className="py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Creators
          </h2>
          <p className="text-lg text-gray-600">Meet our pioneers!!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
