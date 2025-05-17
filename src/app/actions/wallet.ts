"use server"

import {db as supabase } from "@/lib/db"

export async function assignWalletAddress(userId: string, walletAddress: string) {
  if (!walletAddress || !userId) {
    return { success: false, error: "Missing wallet address or user ID" }
  }

  try {
    // Check if this wallet is already assigned to another user
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("address")
      .eq("address", walletAddress)
      .neq("user_id", userId) // Exclude the current user
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing wallet:", checkError)
      return { success: false, error: "Error checking wallet status" }
    }

    if (existingUser) {
      return {
        success: false,
        error: "This wallet is already associated with another account",
      }
    }

    // Update the user's wallet address
    const { error: updateError } = await supabase
      .from("users")
      .update({
        address: walletAddress,
        wallet_assigned_at: new Date().toISOString(),
      })
      .eq("user_id", userId)

    if (updateError) {
      console.error("Error updating wallet address:", updateError)
      return { success: false, error: "Failed to update wallet address" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error assigning wallet:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Function to check if a user has a wallet assigned
export async function checkUserWallet(userId: string) {
  try {
    const { data, error } = await supabase.from("users").select("address, wallet_assigned_at").eq("user_id", userId).single()

    if (error) {
      console.error("Error checking user wallet:", error)
      return { hasWallet: false, error: "Failed to check wallet status" }
    }

    return {
      hasWallet: !!data.wallet_assigned_at,
      walletAddress: data.address,
    }
  } catch (error) {
    console.error("Error in checkUserWallet:", error)
    return { hasWallet: false, error: "An unexpected error occurred" }
  }
}
