import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function truncateAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address) return ""
  if (address.length <= startLength + endLength) return address
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`
}