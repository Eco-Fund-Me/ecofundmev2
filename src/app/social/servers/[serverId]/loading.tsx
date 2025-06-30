import { Skeleton } from "@/components/ui/skeleton"

export default function ServerLoading() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Server Sidebar Skeleton */}
      <div className="w-60 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1 bg-gray-700" />
              <Skeleton className="h-3 w-24 bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <Skeleton className="h-4 w-28 mb-2 bg-gray-700" />
          <Skeleton className="h-2 w-full mb-2 bg-gray-700" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16 bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-700" />
          </div>
        </div>

        <div className="flex-1 p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full mb-1 bg-gray-700" />
          ))}
        </div>

        <div className="p-3 bg-gray-900 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
            <div className="flex-1">
              <Skeleton className="h-3 w-16 mb-1 bg-gray-700" />
              <Skeleton className="h-3 w-12 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex-1 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Members Sidebar Skeleton */}
      <div className="w-60 bg-white border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2 mb-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
