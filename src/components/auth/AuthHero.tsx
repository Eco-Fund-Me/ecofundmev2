import Image from "next/image"

interface AuthHeroProps {
  title: string
  subtitle: string
}

export function AuthHero({ title, subtitle }: AuthHeroProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-8">
      <Image
        src="/auth-hero.png"
        alt="Family in nature"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00EE7D]">{title}</h1>
        <p className="text-white text-lg">{subtitle}</p>
      </div>
    </div>
  )
}
