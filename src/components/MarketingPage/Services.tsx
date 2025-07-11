"use client"

import { motion } from "framer-motion"
import { Leaf, Droplets, Recycle, Building2 } from "lucide-react"

const services = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Renewable Energy",
    description: "Support projects that harness clean, sustainable energy sources.",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Blue Economy",
    description: "Fund initiatives that protect and restore our oceans and water resources.",
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: "Circular Economy",
    description: "Back projects that reduce waste and promote sustainable resource use.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Green Infrastructure",
    description: "Invest in sustainable building and infrastructure development.",
  },
]

export default function Services() {
  return (
    <div className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
            Our Focus Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E3A29]">What We Support</h2>
          <p className="text-lg text-[#5A7D6A] max-w-2xl mx-auto">
            EcoFundMe focuses on key areas where your contributions can make the biggest impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#F5F2EA] rounded-xl border border-[#E8E4D8] p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1E3A29] flex items-center justify-center mx-auto mb-6 text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1E3A29]">{service.title}</h3>
              <p className="text-[#5A7D6A]">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact metrics inspired by ecohome5.jpg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 bg-[#F5F2EA] rounded-xl border border-[#E8E4D8] p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-[#1E3A29] text-center">Our Impact So Far</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#4CAF50]">859+</p>
              <p className="text-[#5A7D6A] mt-2">Projects Completed</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#4CAF50]">99%</p>
              <p className="text-[#5A7D6A] mt-2">Satisfaction Rate</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#4CAF50]">683+</p>
              <p className="text-[#5A7D6A] mt-2">Expert Team Members</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-[#4CAF50]">860+</p>
              <p className="text-[#5A7D6A] mt-2">Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
