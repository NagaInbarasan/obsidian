export function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">
          This page is under construction by a specialized agent.
        </p>
      </div>
    </div>
  )
}
