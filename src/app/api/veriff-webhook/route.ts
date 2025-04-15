import { NextResponse } from "next/server";
import crypto from "crypto"; // Needed for HMAC verification
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Get Veriff's HMAC signature
    const signature = request.headers.get("x-hmac-signature") || "";

    // Get raw request body for signature verification
    const bodyText = await request.text();

    // Verify the signature
    if (!verifySignature(bodyText, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse JSON
    const body = JSON.parse(bodyText);
    console.log("Received Webhook Payload:", body);

    // Extract data safely
    const verification = body.data?.verification ?? null; 
    const userId = body.vendorData || null; 
    const status = verification?.decision || body.status || "unknown"; 

    // Ensure we have enough data to process
    if (!verification) {
      console.error("Missing verification data:", body);
      return NextResponse.json({ error: "Invalid payload structure" }, { status: 400 });
    }

    if (!userId) {
      console.warn("Warning: vendorData is missing or null. Cannot link verification to a user.");
    }

    // Handle different verification statuses
    let updateData: Record<string, unknown> = { kyc_status: status };

    if (status === "approved") {
      updateData = {
        address: userId,
        kyc_status: "approved",
        kyc_verified_at: new Date().toISOString(),
        kyc_verification_id: body.sessionId, 
        document_type: verification.document?.type?.value || "unknown",
        document_country: verification.document?.country?.value || "unknown",
        document_number: verification.document?.number?.value || "unknown",
      };
    } else if (status === "declined") {
      updateData = {
        kyc_status: "rejected",
        kyc_rejection_reason: "Decision score too low" 
      };
    }

    // Upsert the user record with KYC status (only if we have a userId)
  try {
  const { error } = await db.from("users").upsert(updateData, { onConflict: "address" });
  if (error) {
    console.error("❌ Supabase Upsert Error:", error);
    return NextResponse.json({ error: "Database update failed", details: error }, { status: 500 });
  }
} catch (err) {
  console.error("❌ Unexpected Supabase Error:", err);
  return NextResponse.json({ error: "Unexpected database error" }, { status: 500 });
}


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Veriff webhook:", error);
    return NextResponse.json({ error: "Failed to process verification result" }, { status: 500 });
  }
}

// HMAC Signature Verification
function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.VERIFF_API_KEY;
  if (!secret) {
    console.error("Missing VERIFF_API_KEY");
    return false;
  }

  // Compute HMAC-SHA256
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest("hex");

  return expectedSignature === signature;
}


