"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailUpdates: true,
    campaignUpdates: true,
    newRewards: true,
    successfulFunding: true,
    marketingEmails: false,
    smsNotifications: false,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the settings to your backend here
    console.log("Notification settings submitted:", settings)
    // Show success message
    alert("Notification settings updated successfully!")
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailUpdates" className="text-base font-normal">
                  Campaign Updates
                </Label>
                <p className="text-sm text-gray-500">Receive updates about campaigns you&apos;ve backed</p>
              </div>
              <Switch
                id="emailUpdates"
                checked={settings.emailUpdates}
                onCheckedChange={() => handleToggle("emailUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="campaignUpdates" className="text-base font-normal">
                  Campaign Milestones
                </Label>
                <p className="text-sm text-gray-500">Get notified when campaigns reach important milestones</p>
              </div>
              <Switch
                id="campaignUpdates"
                checked={settings.campaignUpdates}
                onCheckedChange={() => handleToggle("campaignUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newRewards" className="text-base font-normal">
                  New Rewards
                </Label>
                <p className="text-sm text-gray-500">Get notified when you earn new rewards</p>
              </div>
              <Switch
                id="newRewards"
                checked={settings.newRewards}
                onCheckedChange={() => handleToggle("newRewards")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="successfulFunding" className="text-base font-normal">
                  Successful Funding
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified when campaigns you&apos;ve backed are successfully funded
                </p>
              </div>
              <Switch
                id="successfulFunding"
                checked={settings.successfulFunding}
                onCheckedChange={() => handleToggle("successfulFunding")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" className="text-base font-normal">
                  Marketing Emails
                </Label>
                <p className="text-sm text-gray-500">Receive promotional emails and newsletters</p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">SMS Notifications</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotifications" className="text-base font-normal">
                SMS Alerts
              </Label>
              <p className="text-sm text-gray-500">Receive important updates via text message</p>
            </div>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={() => handleToggle("smsNotifications")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  )
}
