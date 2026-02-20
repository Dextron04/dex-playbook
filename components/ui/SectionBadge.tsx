interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "dark";
}

export default function SectionBadge({
  children,
  variant = "purple",
}: SectionBadgeProps) {
  const styles = {
    purple: "bg-[#8B5CF620] text-purple",
    dark: "bg-[#8B5CF630] text-purple-light",
  };

  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold font-body ${styles[variant]}`}
    >
      {children}
    </span>
  );
}