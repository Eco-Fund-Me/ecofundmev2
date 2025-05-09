"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { mockUserData } from "@/data/individualDashboardData"

export function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    // In a real app, you would update the password via your backend here
    console.log("Password update submitted:", passwordData)

    // Reset form and show success message
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    alert("Password updated successfully!")
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

      <div className="space-y-8">
        {/* Password Change Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Update Password
            </Button>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base">Enable Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>

          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm mb-2">
                Two-factor authentication is now enabled. You&apos;ll be asked for a verification code when signing in.
              </p>
              <Button variant="outline" size="sm">
                Configure 2FA
              </Button>
            </div>
          )}
        </div>

        {/* Connected Wallet */}
        <div>
          <h3 className="text-lg font-medium mb-4">Connected Wallet</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium">Wallet Address</p>
                <p className="text-sm font-mono">{mockUserData.walletAddress}</p>
              </div>
              <Button variant="outline" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        </div>

        {/* Account Activity */}
        <div>
          <h3 className="text-lg font-medium mb-4">Recent Account Activity</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-3 bg-gray-50 border-b text-sm font-medium">Last 3 login attempts</div>
            <div className="divide-y">
              <div className="p-3 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Successful login</p>
                  <p className="text-xs text-gray-500">Chrome on macOS</p>
                </div>
                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
              </div>
              <div className="p-3 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Successful login</p>
                  <p className="text-xs text-gray-500">Safari on iOS</p>
                </div>
                <p className="text-xs text-gray-500">Yesterday, 6:45 PM</p>
              </div>
              <div className="p-3 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Successful login</p>
                  <p className="text-xs text-gray-500">Chrome on Windows</p>
                </div>
                <p className="text-xs text-gray-500">May 10, 2023, 2:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
