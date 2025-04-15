// import Image from "next/image";
// import Link from "next/link";

// interface CreatorCardProps {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
// }

// export function CreatorCard({
//   id,
//   name,
//   description,
//   imageUrl,
// }: CreatorCardProps) {
//   return (
//     <Link href={`/creators/${id}`}>
//       <div className="group cursor-pointer">
//         <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
//           <Image
//             src={imageUrl}
//             alt={name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>
//         <h3 className="text-xl font-semibold mb-2">{name}</h3>
//         <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
//       </div>
//     </Link>
//   );
// }


"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface CreatorCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
}

export function CreatorCard({ id, name, description, imageUrl }: CreatorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6 relative">
        <div className="absolute -top-12 left-6 w-16 h-16 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${name} avatar`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{name}</h3>
            <Link href={`/creators/${id}`}>
              <div className="w-8 h-8 rounded-full bg-[#00EE7D]/10 flex items-center justify-center text-[#00EE7D] group-hover:bg-[#00EE7D] group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{description}</p>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={`/placeholder-avatar-${i}.jpg`}
                    alt="Project supporter"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-medium">12</span> projects
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
