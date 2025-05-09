import { getUserByAddress } from "./user"


export interface User {
  user_id: string
  address: string | null
  created_at: string | null
  business_id: string | null
  kyc_status: string | null
  kyc_verified_at: string | null
  kyc_verification_id: string | null
  kyc_rejection_reason: string | null
  document_type: string | null
  document_country: string | null
  document_number: string | null
  user_type: "individual" | "business"
  wallet_assigned_at: string | null
  oauth_provider: string | null
  first_name: string | null
  last_name: string | null
  email: string
  business_name: string | null
}

export interface UserInfo extends User {
  profilelink: string
}


export default async function getUserInfoByAddress(address: string): Promise<{
  success: boolean
  userInfo?: UserInfo
  error?: string
  code?: string
}> {
  const result = await getUserByAddress(address)

  if (!result.success || !result.user) {
    return {
      success: false,
      error: result.error,
      code: result.code,
    }
  }

  const user = result.user

  // Add computed fields
  const profilelink =
    user.user_type === "business"
      ? `organization/dashboard/`
      : `individual/dashboard`

//   const displayName =
//     user.user_type === "business"
//       ? user.business_name || user.email
//       : `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email

  const userInfo: UserInfo = {
    ...user,
    profilelink,
  }

  return {
    success: true,
    userInfo,
  }
}
