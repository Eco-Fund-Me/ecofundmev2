import { NextResponse } from "next/server"
import { db as supabaseAdmin } from "@/lib/db"
import { sendKybStatusEmail } from "@/lib/email-service"

export async function POST(request: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
     const { id } = await params

    const { feedback } = await request.json()

    if (!feedback || feedback.trim() === "") {
      return NextResponse.json({ error: "Feedback is required for rejection" }, { status: 400 })
    }

    // Get current application data
    const { data: application, error: fetchError } = await supabaseAdmin
      .from("kyb")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !application) {
      console.error("Error fetching KYB application:", fetchError)
      return NextResponse.json({ error: "KYB application not found" }, { status: 404 })
    }

    // Update application status in Supabase
    const { data: updatedApplication, error: updateError } = await supabaseAdmin
      .from("kyb")
      .update({
        status: "rejected",
        feedback,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (updateError) {
      console.error("Error rejecting KYB application:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Send email notification to the applicant
    try {
      await sendKybStatusEmail({
        to: application.email || "danielnsayensu@gmail.com",
        subject: "Your KYB Application Requires Updates",
        status: "rejected",
        businessName: application.business_details.businessName,
        feedback,
      })
    } catch (emailError) {
      console.error("Failed to send rejection email:", emailError)
      // Continue with the rejection process even if email fails
    }

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error("Error rejecting KYB application:", error)
    return NextResponse.json({ error: "Failed to reject KYB application" }, { status: 500 })
  }
}
