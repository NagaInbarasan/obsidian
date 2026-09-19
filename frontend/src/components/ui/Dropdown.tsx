// @ts-nocheck
import * as React from "react"
import { cn } from "@/lib/utils"

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  className
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-80 slide-in-from-top-1",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  onClick,
  className
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "block px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors",
        className
      )}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator() {
  return <div className="h-px w-full bg-border my-1" />
}
