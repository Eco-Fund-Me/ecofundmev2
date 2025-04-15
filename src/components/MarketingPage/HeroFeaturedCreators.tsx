"use client"

import { CreatorCard } from "./CreatorCard"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

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
]

export default function HeroFeaturedCreators() {
  return (
    <div id="about" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-[#00EE7D]/10 text-[#00EE7D] text-sm font-medium rounded-full mb-4">
            Our Community
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Creators</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the innovative minds behind our most impactful green projects and initiatives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="transform transition-all duration-300 hover:scale-[1.03]"
            >
              <CreatorCard {...creator} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 text-[#00EE7D] hover:text-[#00EE7D]/80 font-medium text-lg group"
          >
            <span className="border-b-2 border-[#00EE7D] pb-1 group-hover:border-[#00EE7D]/80">View all creators</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00EE7D]">120+</p>
            <p className="text-gray-600 mt-2">Projects Funded</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00EE7D]">$2.4M</p>
            <p className="text-gray-600 mt-2">Total Raised</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00EE7D]">15K+</p>
            <p className="text-gray-600 mt-2">Contributors</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00EE7D]">40+</p>
            <p className="text-gray-600 mt-2">Countries</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
