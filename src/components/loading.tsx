import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full space-y-12">
      {/* Hero Section Loading */}
      <div className="relative min-h-[80vh] bg-[#040B08]">
        <div className="container relative h-full min-h-[80vh] flex flex-col justify-center px-4 sm:px-6">
          <Skeleton className="h-12 w-3/4 max-w-2xl mb-4 bg-[#00EE7D]/10" />
          <Skeleton className="h-6 w-2/3 max-w-xl mb-8 bg-[#00EE7D]/10" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-32 bg-[#00EE7D]/10" />
            <Skeleton className="h-10 w-32 bg-[#00EE7D]/10" />
          </div>
        </div>
      </div>

      {/* Featured Campaigns Section Loading */}
      <div className="container px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64 bg-[#00EE7D]/10" />
          <Skeleton className="h-10 w-32 bg-[#00EE7D]/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="space-y-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <Skeleton className="w-full aspect-square rounded-lg bg-[#00EE7D]/10" />
              <Skeleton className="h-6 w-3/4 bg-[#00EE7D]/10" />
              <Skeleton className="h-4 w-1/2 bg-[#00EE7D]/10" />
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-4 w-24 bg-[#00EE7D]/10" />
                <Skeleton className="h-2 w-16 bg-[#00EE7D]/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Creators Section Loading */}
      <div className="container px-4 py-12 bg-[#040B08]">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64 bg-[#00EE7D]/10" />
          <Skeleton className="h-10 w-32 bg-[#00EE7D]/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4 bg-[#0A1512] p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-[#00EE7D]/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-[#00EE7D]/10" />
                  <Skeleton className="h-3 w-24 bg-[#00EE7D]/10" />
                </div>
              </div>
              <Skeleton className="w-full aspect-video rounded-lg bg-[#00EE7D]/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-[#00EE7D]/10" />
                <Skeleton className="h-4 w-3/4 bg-[#00EE7D]/10" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-8 w-24 rounded-full bg-[#00EE7D]/10" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full bg-[#00EE7D]/10" />
                  <Skeleton className="h-8 w-8 rounded-full bg-[#00EE7D]/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
