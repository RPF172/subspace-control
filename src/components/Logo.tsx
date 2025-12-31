import logo from "@/assets/subspace-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex items-center gap-3">
      <img 
        src={logo} 
        alt="SubSpace" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className="font-serif text-xl font-semibold text-foreground tracking-tight">
          SubSpace
        </span>
      )}
    </div>
  );
}
