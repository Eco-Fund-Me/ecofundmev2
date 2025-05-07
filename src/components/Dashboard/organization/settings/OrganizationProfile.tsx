import { User } from "lucide-react"
import Image from "next/image"

interface OrganizationData {
  name: string
  email: string
  website: string
  description: string
  logo: string
}

interface OrganizationProfileProps {
  organization: OrganizationData
}

export function OrganizationProfile({ organization }: OrganizationProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <User className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Organization Profile</h3>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <Image
              src={organization.logo || "/placeholder.svg"}
              alt="Organization Logo"
              className="w-24 h-24 rounded-lg border border-gray-200"
              fill
            />
            <button className="mt-2 text-sm text-green-500 hover:text-green-700">Change Logo</button>
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue={organization.name}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={organization.email}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                defaultValue={organization.website}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                defaultValue={organization.description}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
