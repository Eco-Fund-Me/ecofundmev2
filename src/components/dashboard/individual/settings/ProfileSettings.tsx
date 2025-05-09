"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockUserData } from "@/data/individualDashboardData"

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: mockUserData.name,
    email: mockUserData.email,
    bio: "I'm passionate about environmental sustainability and supporting eco-friendly initiatives.",
    location: "San Francisco, CA",
    website: "https://example.com",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the data to your backend here
    console.log("Profile data submitted:", formData)
    // Show success message
    alert("Profile updated successfully!")
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32">
              <Image
                src={mockUserData.avatar || "/placeholder.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-white shadow"
              />
            </div>
            <Button type="button" variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
