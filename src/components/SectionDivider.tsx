import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "line" | "space" | "sigil";
}

export const SectionDivider = ({ className = "", variant = "line" }: SectionDividerProps) => {
  if (variant === "space") {
    return <div className={cn("h-16 lg:h-24", className)} />;
  }

  if (variant === "sigil") {
    return (
      <div className={cn("w-full py-10 flex items-center justify-center", className)}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rotate-45 bg-accent/20 border border-accent/30" />
          <div className="w-16 h-px bg-border" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-6", className)}>
      <div className="h-px bg-border" />
    </div>
  );
};
