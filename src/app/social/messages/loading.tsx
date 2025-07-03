import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function MessagesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Skeleton */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-32 h-6" />
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-8" />
                ))}
              </div>
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Messages Sidebar Skeleton */}
          <div className="col-span-4">
            <Card className="h-full border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-8 h-8" />
                </div>
                <Skeleton className="w-full h-10" />
              </CardHeader>

              <Separator />

              <CardContent className="p-2">
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="w-24 h-4" />
                          <Skeleton className="w-12 h-3" />
                        </div>
                        <Skeleton className="w-full h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area Skeleton */}
          <div className="col-span-8">
            <Card className="h-full border border-gray-200 flex flex-col">
              {/* Chat Header Skeleton */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-24 h-3" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="w-8 h-8" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages Area Skeleton */}
              <div className="flex-1 p-4 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-64 h-12 rounded-lg" />
                      <Skeleton className="w-16 h-3" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Skeleton */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Skeleton className="flex-1 h-10" />
                  <Skeleton className="w-16 h-10" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
