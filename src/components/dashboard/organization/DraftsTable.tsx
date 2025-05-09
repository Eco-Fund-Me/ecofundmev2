import { Edit, Trash2, ExternalLink } from "lucide-react"
import { formatDate } from "@/utils/formatDate"
import { ProgressBar } from "./shared/ProgressBar"

interface Draft {
  id: number
  title: string
  lastEdited: string
  completionPercentage: number
}

interface DraftsTableProps {
  drafts: Draft[]
}

export function DraftsTable({ drafts }: DraftsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Campaign Drafts</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-center sm:text-left">
          Create new draft
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Draft Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Edited</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Completion</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drafts.map((draft) => (
              <tr key={draft.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{draft.title}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{formatDate(draft.lastEdited)}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{draft.completionPercentage}%</span>
                    <ProgressBar value={draft.completionPercentage} />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-500 hover:text-blue-700" title="Edit draft">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-red-500 hover:text-red-700" title="Delete draft">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-green-500 hover:text-green-700" title="Launch campaign">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {drafts.map((draft) => (
          <div key={draft.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{draft.title}</h3>
              <div className="flex space-x-2">
                <button className="p-1 text-blue-500 hover:text-blue-700" title="Edit draft">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-1 text-red-500 hover:text-red-700" title="Delete draft">
                  <Trash2 className="h-5 w-5" />
                </button>
                <button className="p-1 text-green-500 hover:text-green-700" title="Launch campaign">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Last Edited</p>
                <p>{formatDate(draft.lastEdited)}</p>
              </div>
              <div>
                <p className="text-gray-500">Completion</p>
                <div className="flex items-center mt-1">
                  <span className="mr-2">{draft.completionPercentage}%</span>
                  <ProgressBar value={draft.completionPercentage} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {drafts.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">You don&apos;t have any campaign drafts yet.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Create your first draft
          </button>
        </div>
      )}
    </div>
  )
}
