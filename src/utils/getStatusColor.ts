export function getStatusColor(status: string): string {
    switch (status) {
      case "Ongoing":
      case "In Progress":
        return "text-green-500"
      case "Funded":
      case "Successful":
        return "text-blue-500"
      case "Canceled":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }
  