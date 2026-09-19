// @ts-nocheck
import { AlertTriangle } from "lucide-react"
import { Button } from "./Button"

export function ErrorState({ title = "Something went wrong", description, onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 p-12 text-center text-destructive">
      <AlertTriangle className="h-8 w-8 mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm max-w-md opacity-90">{description}</p>}
      {onRetry && (
        <Button variant="outline" className="mt-6 border-destructive/30 text-destructive hover:bg-destructive hover:text-white" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
