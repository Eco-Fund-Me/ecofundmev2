

// Add a function to assign wallet to user after login
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function assignWalletToUser(userId: string, walletAddress: string, supabase: any) {
  if (!walletAddress || !userId) {
    return { success: false, error: "Missing wallet address or user ID" }
  }

  try {
    // Check if this wallet is already assigned to another user
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("address")
      .eq("address", walletAddress)
      .neq("id", userId) // Exclude the current user
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
      .eq("id", userId)

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
