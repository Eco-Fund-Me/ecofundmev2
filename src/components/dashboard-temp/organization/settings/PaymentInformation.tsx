import { formatDate } from "@/utils/formatDate"
import { CreditCard } from "lucide-react"


interface PaymentHistory {
  date: string
  amount: number
  description: string
}

interface PaymentData {
  defaultMethod: string
  billingAddress: string
  paymentHistory: PaymentHistory[]
}

interface PaymentInformationProps {
  payment: PaymentData
}

export function PaymentInformation({ payment }: PaymentInformationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b border-gray-200">
        <CreditCard className="mr-2 h-5 w-5 text-green-500" />
        <h3 className="text-lg font-medium">Payment Information</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h4 className="font-medium">Default Payment Method</h4>
          <p className="text-sm text-gray-500">{payment.defaultMethod}</p>
          <button className="mt-2 text-sm text-green-500 hover:text-green-700">Update Payment Method</button>
        </div>
        <div>
          <h4 className="font-medium">Billing Address</h4>
          <p className="text-sm text-gray-500">{payment.billingAddress}</p>
          <button className="mt-2 text-sm text-green-500 hover:text-green-700">Update Billing Address</button>
        </div>
        <div>
          <h4 className="font-medium">Payment History</h4>
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {payment.paymentHistory.map((payment, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-gray-100 pb-2"
              >
                <span>{formatDate(payment.date)}</span>
                <span>
                  ${payment.amount} - {payment.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
