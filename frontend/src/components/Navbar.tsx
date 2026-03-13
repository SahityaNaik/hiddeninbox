import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

type Theme = "light" | "dark";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const isDashboard = pathname === "/dashboard";
  const nextTheme: Theme = theme === "light" ? "dark" : "light";

  return (
    <nav className="flex items-center justify-between gap-[0.8rem] md:gap-[1.25rem] px-[1rem] md:px-[1.25rem] py-[0.9rem] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_55%),var(--color-surface-glass)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-subtle)] backdrop-blur-[18px]">
      <Link
        to="/"
        className="inline-flex items-center gap-[0.4rem] md:gap-[0.5rem] px-[0.5rem] md:px-[0.7rem] py-[0.2rem] rounded-full bg-[radial-gradient(circle_at_top,var(--color-primary-soft),transparent_55%)] hover:no-underline"
      >
        <span className="inline-flex items-center justify-center w-[1.85rem] h-[1.85rem] md:w-[1.95rem] md:h-[1.95rem] rounded-full bg-[radial-gradient(circle_at_30%_0,#f97316_0,#f97316_22%,#0f172a_55%)] shadow-[0_0_0_1px_rgba(15,23,42,0.65),_0_10px_25px_rgba(15,23,42,0.75)] text-[0.85rem] md:text-[0.95rem] text-[#f9fafb]">
          🔒
        </span>
        <span className="flex flex-col">
          <span className="font-semibold text-[0.95rem] md:text-[1.05rem] tracking-[-0.03em] leading-tight">
            HiddenInbox
          </span>
          <span className="hidden sm:block text-[0.7rem] text-[var(--color-text-muted)] leading-tight">
            A private link for anonymous feedback
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-[0.6rem] md:gap-[0.85rem] text-[0.95rem] text-[var(--color-text-soft)]">
        {token ? (
          <>
            {!isDashboard && (
              <Link
                to="/dashboard"
                className={`relative px-[0.35rem] after:content-[''] after:absolute after:inset-x-[0.45rem] after:-bottom-[0.2rem] after:h-[2px] after:rounded-full after:bg-[linear-gradient(to_right,rgba(96,165,250,0.4),rgba(147,51,234,0.5))] after:origin-center after:transition-all after:duration-150 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 hover:no-underline hidden sm:block ${
                  pathname === "/dashboard"
                    ? "text-[var(--color-text)] font-medium after:scale-x-100 after:opacity-100"
                    : "after:scale-x-0 after:opacity-0"
                }`}
              >
                Dashboard
              </Link>
            )}

            <span className="hidden sm:inline-flex text-[0.85rem] px-[0.7rem] py-[0.2rem] rounded-full bg-[radial-gradient(circle_at_top,var(--color-primary-soft),transparent_55%)] border border-[var(--color-border-subtle)] text-[var(--color-text-soft)]">
              @{username}
            </span>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              type="button"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`relative px-[0.35rem] after:content-[''] after:absolute after:inset-x-[0.45rem] after:-bottom-[0.2rem] after:h-[2px] after:rounded-full after:bg-[linear-gradient(to_right,rgba(96,165,250,0.4),rgba(147,51,234,0.5))] after:origin-center after:transition-all after:duration-150 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 hover:no-underline ${
                pathname === "/login"
                  ? "text-[var(--color-text)] font-medium after:scale-x-100 after:opacity-100"
                  : "after:scale-x-0 after:opacity-0"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`relative px-[0.35rem] after:content-[''] after:absolute after:inset-x-[0.45rem] after:-bottom-[0.2rem] after:h-[2px] after:rounded-full after:bg-[linear-gradient(to_right,rgba(96,165,250,0.4),rgba(147,51,234,0.5))] after:origin-center after:transition-all after:duration-150 after:ease-out hover:after:scale-x-100 hover:after:opacity-100 hover:no-underline ${
                pathname === "/signup"
                  ? "text-[var(--color-text)] font-medium after:scale-x-100 after:opacity-100"
                  : "after:scale-x-0 after:opacity-0"
              }`}
            >
              Signup
            </Link>
          </>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="!border !border-[var(--color-border-strong)] rounded-full hover:!text-[var(--color-text)]"
          aria-label={`Switch to ${nextTheme} mode`}
          onClick={() => setTheme(nextTheme)}
        >
          {theme === "light" ? "☾" : "☀︎"}
        </Button>
      </div>
    </nav>
  );
}
