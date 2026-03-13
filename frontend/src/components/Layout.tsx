import type { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <header className="sticky top-[0.85rem] z-30 max-w-[1280px] mx-auto mb-[1.80rem] px-[1.25rem] md:px-[1.75rem]">
        <Navbar />
      </header>
      <main className="w-full max-w-[1280px] mx-auto p-[1.5rem_1.25rem_3.5rem] md:p-[1.5rem_1.75rem_4rem] animate-[fadeIn_320ms_ease-out] flex-1">
        {children}
      </main>
    </div>
  );
}
