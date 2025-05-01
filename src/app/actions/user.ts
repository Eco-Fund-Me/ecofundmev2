"use server"

import { db as supabase } from "@/lib/db"

// Define the types for the function parameters
type UserType = "individual" | "business"

interface UserParams {
  user_type: UserType
  userID : string
  address?: string  // This is the wallet address from Thirdweb
  email: string
  first_name?: string
  last_name?: string
  business_name?: string
  business_id?: string
}

export async function addUser(params: UserParams) {
  try {
    // Check if user with this address already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", params.userID)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 means no rows returned, which is what we want
      console.error("Error checking for existing user:", checkError)
      return { success: false, error: "Error checking for existing user", code: "CHECK_ERROR" }
    }

    if (existingUser) {
      return { success: false, error: "User with this address already exists", code: "USER_EXISTS" }
    }

    // Prepare user data based on user type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userData: Record<string, any> = {
      user_id: params.userID, // <-- this is critical
      address: params.address,
      user_type: params.user_type,
      email: params.email.toLowerCase(),
      created_at: new Date().toISOString(),
    }

    // Add type-specific fields
    if (params.user_type === "individual") {
      userData.first_name = params.first_name || ""
      userData.last_name = params.last_name || ""
    } else if (params.user_type === "business") {
      userData.business_name = params.business_name || ""
      userData.business_id = params.business_id || crypto.randomUUID()
    }

    // Insert the user into the database
    const { data: newUser, error: insertError } = await supabase.from("users").insert(userData).select().single()

    if (insertError) {
      console.error("Error creating user:", insertError)
      return { success: false, error: "Error creating user", code: "INSERT_ERROR" }
    }

    // For business users, create a business profile
    if (params.user_type === "business" && userData.business_id) {
      const { error: businessError } = await supabase.from("kyb").insert({
        id: userData.business_id,
        userAddress: params.address,  // This links to the user's address
        status: "not_started",
        business_details: {
          businessName: params.business_name || "",
          email: params.email.toLowerCase(),
        },
        verification_progress: 0,
        current_step: "business_details",
      })

      if (businessError) {
        console.error("Error creating business profile:", businessError)
        // We don't return an error here because the user was created successfully
        // But we log it for debugging purposes
      }
    }

    return {
      success: true,
      user: newUser,
      message: `${params.user_type} user created successfully`,
    }
  } catch (error) {
    console.error("Unexpected error creating user:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
      code: "UNEXPECTED_ERROR",
    }
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.error("Admin user list error:", error)
    return false
  }

  return data.users.some(user => user.email?.toLowerCase() === email.toLowerCase())
}


const personalEmailDomains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "protonmail.com", "live.com", "msn.com", "ymail.com",
  "mail.com", "gmx.com"
]

export async function isBusinessEmail(email: string):Promise<boolean> {
  const domain = email.split("@")[1]?.toLowerCase()
  return !!domain && !personalEmailDomains.includes(domain)
}