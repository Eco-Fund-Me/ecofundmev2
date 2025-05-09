import { Bell } from "lucide-react"

interface NotificationSettings {
  emailUpdates: boolean
  campaignAlerts: boolean
  marketingEmails: boolean
  newBackerNotifications: boolean
}

interface NotificationPreferencesProps {
  notifications: NotificationSettings
}

export function NotificationPreferences({ notifications }: NotificationPreferencesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <Bell className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Notification Preferences</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-medium">Email Updates</h4>
            <p className="text-sm text-gray-500">Receive updates about your campaigns via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
            <input type="checkbox" defaultChecked={notifications.emailUpdates} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-medium">Campaign Alerts</h4>
            <p className="text-sm text-gray-500">Get notified when campaigns reach milestones</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
            <input type="checkbox" defaultChecked={notifications.campaignAlerts} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-medium">Marketing Emails</h4>
            <p className="text-sm text-gray-500">Receive promotional content and special offers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
            <input type="checkbox" defaultChecked={notifications.marketingEmails} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-medium">New Backer Notifications</h4>
            <p className="text-sm text-gray-500">Get notified when someone backs your campaign</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
            <input type="checkbox" defaultChecked={notifications.newBackerNotifications} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        <div className="flex justify-end">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Save Preferences</button>
        </div>
      </div>
    </div>
  )
}
