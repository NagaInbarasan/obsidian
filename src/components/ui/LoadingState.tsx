// @ts-nocheck
import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={`h-8 w-8 animate-spin text-primary ${className}`} />
}

export function LoadingPage() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
