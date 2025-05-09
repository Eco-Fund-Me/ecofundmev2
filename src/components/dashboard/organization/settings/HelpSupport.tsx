import { HelpCircle } from "lucide-react"

export function HelpSupport() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <HelpCircle className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Help & Support</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium">Documentation</h4>
            <p className="text-sm text-gray-500 mt-1">View our comprehensive documentation</p>
            <button className="mt-3 text-sm text-green-500 hover:text-green-700">View Documentation</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium">Contact Support</h4>
            <p className="text-sm text-gray-500 mt-1">Get help from our support team</p>
            <button className="mt-3 text-sm text-green-500 hover:text-green-700">Contact Support</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium">FAQ</h4>
            <p className="text-sm text-gray-500 mt-1">Find answers to common questions</p>
            <button className="mt-3 text-sm text-green-500 hover:text-green-700">View FAQ</button>
          </div>
        </div>
      </div>
    </div>
  )
}
