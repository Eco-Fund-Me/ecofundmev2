import { OrganizationProfile } from "./OrganizationProfile"
import { NotificationPreferences } from "./NotificationPreferences"
import { SecuritySettings } from "./SecuritySettings"
import { PaymentInformation } from "./PaymentInformation"
import { HelpSupport } from "./HelpSupport"
import { AccountManagement } from "./AccountManagement"

interface AccountSettingsProps {
  accountSettingsData: {
    organization: {
      name: string
      email: string
      website: string
      description: string
      logo: string
    }
    notifications: {
      emailUpdates: boolean
      campaignAlerts: boolean
      marketingEmails: boolean
      newBackerNotifications: boolean
    }
    security: {
      twoFactorEnabled: boolean
      lastPasswordChange: string
      loginHistory: Array<{
        date: string
        ip: string
        device: string
      }>
    }
    payment: {
      defaultMethod: string
      billingAddress: string
      paymentHistory: Array<{
        date: string
        amount: number
        description: string
      }>
    }
  }
}

export function AccountSettings({ accountSettingsData }: AccountSettingsProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-bold">Account Settings</h2>
      <OrganizationProfile organization={accountSettingsData.organization} />
      <NotificationPreferences notifications={accountSettingsData.notifications} />
      <SecuritySettings security={accountSettingsData.security} />
      <PaymentInformation payment={accountSettingsData.payment} />
      <HelpSupport />
      <AccountManagement />
    </div>
  )
}
