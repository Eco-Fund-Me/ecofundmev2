import { Skeleton } from "@/components/ui/skeleton";

export function HeroLoading() {
  return (
    <div className="relative min-h-[80vh] container overflow-hidden">
      <Skeleton className="absolute inset-0 w-full h-full bg-[#040B08]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="container relative h-full min-h-[80vh] flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          <Skeleton className="h-16 w-3/4 bg-[#00EE7D]/10" />
          <Skeleton className="h-20 w-full bg-[#00EE7D]/10" />
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 md:pt-8">
            <Skeleton className="h-14 w-48 bg-[#00EE7D]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
