import Link from "next/link"
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { MockKYBData } from "@/data/kybData"

interface KYBStatusCardProps {
  kybData: MockKYBData | null
  isLoading: boolean
  compact?: boolean
}

export function KYBStatusCard({ kybData, isLoading, compact = false }: KYBStatusCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-2 w-full mt-4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (!kybData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Unable to load verification status</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Retry</Button>
        </CardFooter>
      </Card>
    )
  }

  const { status, verification_progress, rejection_reason } = kybData

  return (
    <Card className={`${status === "rejected" ? "border-red-200" : ""}`}>
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <CardTitle className="flex items-center">
          {status === "approved" && <CheckCircle className="mr-2 h-5 w-5 text-green-500" />}
          {status === "pending" && <Clock className="mr-2 h-5 w-5 text-blue-500" />}
          {status === "rejected" && <XCircle className="mr-2 h-5 w-5 text-red-500" />}
          {status === "not_started" && <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />}
          Business Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status === "not_started" && (
            <p className="text-sm text-amber-600">
              Your business needs to be verified before you can create campaigns.
            </p>
          )}

          {status === "pending" && (
            <p className="text-sm text-blue-600">
              Your verification is in progress. We&apos;ll notify you once it&apos;s complete.
            </p>
          )}

          {status === "approved" && (
            <p className="text-sm text-green-600">Your business has been successfully verified.</p>
          )}

          {status === "rejected" && (
            <div className="space-y-2">
              <p className="text-sm text-red-600">Your verification was rejected.</p>
              {rejection_reason && <p className="text-sm text-gray-600">Reason: {rejection_reason}</p>}
            </div>
          )}

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Verification Progress</span>
              <span>{verification_progress}%</span>
            </div>
            <Progress
              value={verification_progress}
              className="h-2"
              indicatorClassName={
                status === "approved" ? "bg-green-500" : status === "rejected" ? "bg-red-500" : "bg-blue-500"
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {status === "not_started" && (
          <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
            <Link href="/business-verification">Start Verification</Link>
          </Button>
        )}

        {status === "pending" && (
          <Button className="w-full" variant="outline" asChild>
            <Link href="/dashboard/organization/verification">View Submission</Link>
          </Button>
        )}

        {status === "approved" && (
          <Button className="w-full" variant="outline" asChild>
            <Link href="/dashboard/organization/verification">View Details</Link>
          </Button>
        )}

        {status === "rejected" && (
          <div className="w-full space-y-2">
            <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
              <Link href="/business-verification">Resubmit</Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/dashboard/organization/verification">View Submission</Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
