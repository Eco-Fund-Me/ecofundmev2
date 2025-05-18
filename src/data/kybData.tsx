/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock KYB data based on the provided schema
export type KYBStatus = "not_started" | "pending" | "approved" | "rejected"

export interface MockKYBData {
  id: string
  created_at: string
  userAddress: string
  document_references: Record<string, any>
  status: KYBStatus
  business_details: Record<string, any>
  contact_name: string | null
  email: string | null
  feedback: string | null
  updated_at: string
  verification_progress: number
  current_step: string
  rejection_reason: string | null
  user_id: string
}

// Mock KYB data for different statuses
export const mockKYBData = {
  notStarted: {
    id: "kyb_not_started_123",
    created_at: "2023-01-01T00:00:00Z",
    userAddress: "0x1234567890abcdef1234567890abcdef12345678",
    document_references: {},
    status: "not_started",
    business_details: {},
    contact_name: null,
    email: null,
    feedback: null,
    updated_at: "2023-01-01T00:00:00Z",
    verification_progress: 0,
    current_step: "business_details",
    rejection_reason: null,
    user_id: "user_123",
  },
  pending: {
    id: "kyb_pending_456",
    created_at: "2023-02-15T00:00:00Z",
    userAddress: "0x1234567890abcdef1234567890abcdef12345678",
    document_references: {
      business_license: "business_license.pdf",
      incorporation_certificate: "incorporation_certificate.pdf",
    },
    status: "pending",
    business_details: {
      name: "Green Earth Solutions",
      registration_number: "GES12345",
      address: {
        street: "123 Eco Street",
        city: "Greenville",
        state: "CA",
        zip: "94107",
        country: "USA",
      },
      industry: "Renewable Energy",
      website: "https://greenearth.example.com",
    },
    contact_name: "Jane Smith",
    email: "jane@greenearth.example.com",
    feedback: null,
    updated_at: "2023-02-20T00:00:00Z",
    verification_progress: 60,
    current_step: "controllers",
    rejection_reason: null,
    user_id: "user_123",
  },
  approved: {
    id: "kyb_approved_789",
    created_at: "2023-03-10T00:00:00Z",
    userAddress: "0x1234567890abcdef1234567890abcdef12345678",
    document_references: {
      business_license: "business_license.pdf",
      incorporation_certificate: "incorporation_certificate.pdf",
      tax_document: "tax_document.pdf",
      proof_of_address: "proof_of_address.pdf",
    },
    status: "approved",
    business_details: {
      name: "Green Earth Solutions",
      registration_number: "GES12345",
      address: {
        street: "123 Eco Street",
        city: "Greenville",
        state: "CA",
        zip: "94107",
        country: "USA",
      },
      industry: "Renewable Energy",
      website: "https://greenearth.example.com",
      founding_date: "2018-05-15",
    },
    contact_name: "Jane Smith",
    email: "jane@greenearth.example.com",
    feedback: "All documentation verified successfully.",
    updated_at: "2023-03-15T00:00:00Z",
    verification_progress: 100,
    current_step: "completed",
    rejection_reason: null,
    user_id: "user_123",
  },
  rejected: {
    id: "kyb_rejected_101",
    created_at: "2023-04-05T00:00:00Z",
    userAddress: "0x1234567890abcdef1234567890abcdef12345678",
    document_references: {
      business_license: "business_license.pdf",
      incorporation_certificate: "incorporation_certificate.pdf",
    },
    status: "rejected",
    business_details: {
      name: "Green Earth Solutions",
      registration_number: "GES12345",
      address: {
        street: "123 Eco Street",
        city: "Greenville",
        state: "CA",
        zip: "94107",
        country: "USA",
      },
      industry: "Renewable Energy",
      website: "https://greenearth.example.com",
    },
    contact_name: "Jane Smith",
    email: "jane@greenearth.example.com",
    feedback: "Documentation appears to be outdated. Please provide current business license.",
    updated_at: "2023-04-10T00:00:00Z",
    verification_progress: 70,
    current_step: "business_documents",
    rejection_reason: "The business license provided has expired. Please submit a current business license.",
    user_id: "user_123",
  },
}

// Function to get a mock KYB status for demo purposes
export function getMockKYBData(status: KYBStatus = "pending"): MockKYBData {
  switch (status) {
    case "not_started":
      return mockKYBData.notStarted as MockKYBData
    case "pending":
      return mockKYBData.pending as MockKYBData
    case "approved":
      return mockKYBData.approved as MockKYBData
    case "rejected":
      return mockKYBData.rejected as MockKYBData
    default:
      return mockKYBData.pending as MockKYBData
  }
}
