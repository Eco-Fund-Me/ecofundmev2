import { Shield } from "lucide-react"

export function AccountManagement() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <Shield className="mr-2 h-5 w-5 text-red-500" />
        <h3 className="text-lg font-medium">Account Management</h3>
      </div>
      <div className="p-4">
        <h4 className="font-medium text-red-500">Delete Account</h4>
        <p className="text-sm text-gray-500 mt-1">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete Account</button>
      </div>
    </div>
  )
}
