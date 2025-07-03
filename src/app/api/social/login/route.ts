import { NextResponse } from "next/server"
import {db as supabase} from "@/lib/db" // Adjust the import path to your db helper

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const { address } = await req.json()

    if (!address) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 })
    }

    

    // Find the user record by wallet address
    const { data, error } = await supabase
      .from("users")
      .select("matrix_user_id, matrix_access_token")
      .eq("wallet_address", address)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "User not found or failed to fetch user" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      matrixUserId: data.matrix_user_id,
      matrixAccessToken: data.matrix_access_token,
    })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
