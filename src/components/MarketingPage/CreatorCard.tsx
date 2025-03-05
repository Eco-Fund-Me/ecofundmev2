import Image from "next/image";
import Link from "next/link";

interface CreatorCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export function CreatorCard({
  id,
  name,
  description,
  imageUrl,
}: CreatorCardProps) {
  return (
    <Link href={`/creators/${id}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
