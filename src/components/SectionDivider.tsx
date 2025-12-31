interface SectionDividerProps {
  className?: string;
}

export const SectionDivider = ({ className = "" }: SectionDividerProps) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-6 ${className}`}>
      <div className="h-px bg-border" />
    </div>
  );
};
