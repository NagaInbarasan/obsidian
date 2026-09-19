// @ts-nocheck
import * as React from "react"
import { cn } from "@/lib/utils"

export function Tooltip({
  content,
  children,
  className
}: {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 opacity-0 transition-opacity group-hover:opacity-100",
          "z-50 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background shadow-md",
          className
        )}
      >
        {content}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
      </div>
    </div>
  )
}
