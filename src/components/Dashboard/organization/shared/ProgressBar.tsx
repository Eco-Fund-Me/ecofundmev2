interface ProgressBarProps {
    value: number
  }
  
  export function ProgressBar({ value }: ProgressBarProps) {
    return (
      <div className="h-2 w-full max-w-24 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${value >= 100 ? "bg-green-500" : value >= 50 ? "bg-blue-500" : "bg-red-500"}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    )
  }
  