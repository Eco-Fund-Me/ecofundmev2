"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet } from "lucide-react"

export function PaymentSettings() {
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleCardDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the payment method to your backend here
    console.log("Payment method submitted:", { paymentMethod, cardData })
    // Show success message
    alert("Payment settings updated successfully!")
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Default Payment Method</h3>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="wallet" id="wallet" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="wallet" className="flex items-center text-base font-medium">
                  <Wallet className="mr-2 h-5 w-5" />
                  Crypto Wallet
                </Label>
                <p className="text-sm text-gray-500 mt-1">Use your connected crypto wallet for donations</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="card" className="flex items-center text-base font-medium">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit/Debit Card
                </Label>
                <p className="text-sm text-gray-500 mt-1">Use a credit or debit card for donations</p>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={handleCardDataChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={cardData.cardName}
                        onChange={handleCardDataChange}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardData.expiryDate}
                          onChange={handleCardDataChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={handleCardDataChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Save Payment Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
