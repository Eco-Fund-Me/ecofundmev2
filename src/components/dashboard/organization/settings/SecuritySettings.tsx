import { formatDate } from "@/utils/formatDate"
import { Lock } from "lucide-react"


interface LoginHistory {
  date: string
  ip: string
  device: string
}

interface SecurityData {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  loginHistory: LoginHistory[]
}

interface SecuritySettingsProps {
  security: SecurityData
}

export function SecuritySettings({ security }: SecuritySettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <Lock className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Security Settings</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
            <input type="checkbox" defaultChecked={security.twoFactorEnabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div>
          <h4 className="font-medium">Password</h4>
          <p className="text-sm text-gray-500">Last changed: {formatDate(security.lastPasswordChange)}</p>
          <button className="mt-2 text-sm text-green-500 hover:text-green-700">Change Password</button>
        </div>
        <div>
          <h4 className="font-medium">Recent Login Activity</h4>
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {security.loginHistory.map((login, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-gray-100 pb-2"
              >
                <span>{formatDate(login.date)}</span>
                <span className="text-gray-500">{login.device}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
