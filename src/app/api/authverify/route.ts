
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const { payload } = await req.json();

    // Log the payload to check the value
    console.log("[authverify][debug] Parsed body:", { payload });

    // Check if the payload is a valid string (if it's not, respond with error)
    if (!payload || typeof payload !== "string" || payload.trim() === "") {
      console.warn("[authverify][warning] Invalid payload received:", {
        payload,
      });
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    // Log the extracted payload for debugging
    console.log("[authverify][debug] Extracted payload:", payload);

    // If the payload is "anonymous", reject the request
    if (payload === "anonymous") {
      console.warn("[authverify][warning] Received 'anonymous' payload.");
      return NextResponse.json(
        { error: "Anonymous user cannot be verified" },
        { status: 401 }
      );
    }

    // At this point, we know we have a valid user ID
    console.log("[authverify][debug] Verifying user with ID:", payload);

    // Here you could add your actual user verification logic, such as checking a database
    // or another service to verify the user ID.

    // Example of a successful response
    return NextResponse.json(
      { message: "User verified successfully", userId: payload },
      { status: 200 }
    );
  } catch (error) {
    // Handle any unexpected errors and log them
    console.error("[authverify][error] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during verification" },
      { status: 500 }
    );
  }
}