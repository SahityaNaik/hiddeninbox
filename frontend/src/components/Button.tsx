import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "bg-[var(--btn-secondary-bg)] border-[var(--btn-secondary-border)] text-[var(--color-text-soft)] shadow-[var(--shadow-subtle)] hover:border-[rgba(191,219,254,0.9)] hover:text-[var(--color-text)]"
      : variant === "ghost"
        ? "bg-transparent border-[rgba(148,163,184,0.4)] text-[var(--color-text-soft)] hover:border-[rgba(191,219,254,0.9)] hover:text-[var(--color-text)] hover:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%)]"
        : variant === "danger"
          ? "bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.4),transparent_55%),rgba(127,29,29,0.9)] border-[rgba(248,250,252,0.12)] text-[#fee2e2]"
          : "bg-[radial-gradient(circle_at_top_left,rgba(250,250,250,0.15),transparent_55%),linear-gradient(135deg,var(--color-primary),var(--color-primary-strong),var(--color-accent))] text-[#f9fafb] border-[rgba(191,219,254,0.4)] shadow-[0_14px_30px_rgba(15,23,42,0.85)] hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.95)] active:translate-y-0 active:shadow-[0_10px_25px_rgba(15,23,42,0.9)]";

  const sizeClass =
    size === "sm"
      ? "px-[0.85rem] py-[0.45rem] text-[0.8rem]"
      : size === "lg"
        ? "px-[1.8rem] py-[0.8rem] text-[0.98rem]"
        : "px-[1.25rem] py-[0.6rem] text-[0.9rem]";

  const composed = [
    "inline-flex items-center justify-center gap-[0.4rem] rounded-full font-medium border border-transparent cursor-pointer transition-all duration-150 ease-out outline-none hover:no-underline focus-visible:shadow-[0_0_0_1px_rgba(129,140,248,0.8),_0_0_0_10px_rgba(79,70,229,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
    variantClass,
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <button {...props} className={composed}>
      {children}
    </button>
  );
}
