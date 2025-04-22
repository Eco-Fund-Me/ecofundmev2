// "use client"

// import { motion } from "framer-motion"
// import Image from "next/image"
// import { useState } from "react"
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// const testimonials = [
//   {
//     id: 1,
//     quote:
//       "EcoFundMe has transformed how we connect with donors. The transparency of blockchain technology has built incredible trust with our supporters.",
//     name: "Sarah Johnson",
//     title: "Project Lead, Renewable Energy Initiative",
//     avatar: "/placeholder-avatar-1.jpg",
//   },
//   {
//     id: 2,
//     quote:
//       "As a donor, I appreciate being able to track exactly how my contribution is making an impact. The tokenized rewards are a nice bonus too!",
//     name: "Michael Chen",
//     title: "Regular Contributor",
//     avatar: "/placeholder-avatar-2.jpg",
//   },
//   {
//     id: 3,
//     quote:
//       "The verification process gives me confidence that I'm supporting legitimate green projects that are making a real difference.",
//     name: "Aisha Patel",
//     title: "Environmental Advocate",
//     avatar: "/placeholder-avatar-3.jpg",
//   },
// ]

// export default function Testimonials() {
//   const [activeIndex, setActiveIndex] = useState(0)

//   const nextTestimonial = () => {
//     setActiveIndex((prev) => (prev + 1) % testimonials.length)
//   }

//   const prevTestimonial = () => {
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//   }

//   return (
//     <div className="py-24 md:py-32 bg-white relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />
//       <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />

//       <div className="container px-4 sm:px-6 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-3 py-1 bg-[#00EE7D]/10 text-[#00EE7D] text-sm font-medium rounded-full mb-4">
//             Testimonials
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">What People Say</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Hear from project creators and contributors about their experience with EcoFundMe.
//           </p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto">
//           <div className="relative bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg">
//             <div className="absolute -top-6 -left-6">
//               <Quote className="w-12 h-12 text-[#00EE7D]/30" />
//             </div>

//             <motion.div
//               key={activeIndex}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="text-center"
//             >
//               <p className="text-xl md:text-2xl text-gray-800 italic mb-8">&quot;{testimonials[activeIndex].quote}&quot;</p>

//               <div className="flex flex-col items-center">
//                 <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
//                   <Image
//                     src={testimonials[activeIndex].avatar || "/placeholder.svg"}
//                     alt={testimonials[activeIndex].name}
//                     width={64}
//                     height={64}
//                     className="object-cover"
//                   />
//                 </div>
//                 <h4 className="text-lg font-bold">{testimonials[activeIndex].name}</h4>
//                 <p className="text-gray-600">{testimonials[activeIndex].title}</p>
//               </div>
//             </motion.div>

//             <div className="flex justify-center mt-8 gap-4">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === activeIndex ? "bg-[#00EE7D] scale-125" : "bg-gray-300"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>

//             <div className="absolute top-1/2 -translate-y-1/2 -left-4">
//               <button
//                 onClick={prevTestimonial}
//                 className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#00EE7D] hover:text-white transition-all duration-300"
//                 aria-label="Previous testimonial"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="absolute top-1/2 -translate-y-1/2 -right-4">
//               <button
//                 onClick={nextTestimonial}
//                 className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#00EE7D] hover:text-white transition-all duration-300"
//                 aria-label="Next testimonial"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "EcoFundMe has transformed how we connect with donors. The transparency of blockchain technology has built incredible trust with our supporters.",
    name: "Sarah Johnson",
    title: "Project Lead, Renewable Energy Initiative",
    avatar: "/sarah.jpg",
  },
  {
    id: 2,
    quote:
      "As a donor, I appreciate being able to track exactly how my contribution is making an impact. The tokenized rewards are a nice bonus too!",
    name: "Michael Chen",
    title: "Regular Contributor",
    avatar: "/chen.jpg",
  },
  {
    id: 3,
    quote:
      "The verification process gives me confidence that I'm supporting legitimate green projects that are making a real difference.",
    name: "Aisha Patel",
    title: "Environmental Advocate",
    avatar: "/aisha.jpg",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />

        {/* Subtle leaf pattern in background */}
        <div className="absolute top-20 right-20 opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
              fill="#1E3A29"
            />
          </svg>
        </div>
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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E3A29]">What People Say</h2>
          <p className="text-lg text-[#5A7D6A] max-w-2xl mx-auto">
            Hear from project creators and contributors about their experience with EcoFundMe.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#F5F2EA] rounded-3xl p-8 md:p-12 border border-[#E8E4D8]">
            <div className="absolute -top-6 -left-6">
              <Quote className="w-12 h-12 text-[#4CAF50]/30" />
            </div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-[#1E3A29] italic mb-8">&quot;{testimonials[activeIndex].quote}&quot;</p>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-[#4CAF50]">
                  <Image
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-[#1E3A29]">{testimonials[activeIndex].name}</h4>
                <p className="text-[#5A7D6A]">{testimonials[activeIndex].title}</p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-[#4CAF50] scale-125" : "bg-[#E8E4D8]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -left-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-[#E8E4D8] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4">
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-[#E8E4D8] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
