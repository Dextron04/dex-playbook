import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold font-body rounded-full transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-purple text-white hover:bg-[#7C3AED] active:scale-[0.98]",
    ghost:
      "bg-white/10 text-white border border-white/20 hover:bg-white/15 active:scale-[0.98]",
    dark:
      "bg-near-black text-white hover:bg-[#27272A] active:scale-[0.98]",
  };

  const sizes = {
    sm:  "px-5 py-2.5 text-sm",
    md:  "px-8 py-4 text-base",
    lg:  "px-10 py-5 text-lg",
  };

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
