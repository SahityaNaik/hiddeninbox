import { useState, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: ReactNode;
  error?: string;
  className?: string;
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  helperText,
  error,
  className = "",
  showPasswordToggle,
  type,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const isPassword = type === "password";
  const inputType =
    isPassword && showPasswordToggle && isVisible ? "text" : type;

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-[0.8rem] font-medium text-[var(--color-text-soft)]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          {...props}
          type={inputType}
          className={[
            "w-full px-[0.75rem] py-[0.65rem] rounded-full border border-[rgba(148,163,184,0.7)] bg-[var(--input-bg)] text-[var(--color-text)] text-[0.9rem] outline-none transition-all duration-150 ease-out shadow-[var(--input-shadow)]",
            "focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary)]",
            "placeholder:text-[var(--color-text-muted)]",
            isPassword && showPasswordToggle ? "pr-[2.75rem]" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-[1.1rem] top-1/2 -translate-y-1/2 text-[var(--color-text-soft)] hover:text-[var(--color-primary-strong)] transition-colors p-1 z-10"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {(helperText || error) && (
        <p
          className={
            error
              ? "text-[0.75rem] text-[var(--color-danger)]"
              : "text-[0.75rem] text-[var(--color-text-muted)]"
          }
        >
          {error ? error : helperText}
        </p>
      )}
    </div>
  );
}
