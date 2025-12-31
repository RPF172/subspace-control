interface ValuePillProps {
  children: React.ReactNode;
}

export function ValuePill({ children }: ValuePillProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-foreground-secondary bg-background-surface border border-border rounded-full">
      {children}
    </span>
  );
}
