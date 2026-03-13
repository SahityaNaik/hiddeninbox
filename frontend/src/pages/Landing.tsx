import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Landing() {
  const token = localStorage.getItem("token");

  return (
    <Layout>
      <section className="grid gap-[1.25rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-10 md:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
          <span className="inline-flex items-center gap-[0.35rem] px-[0.6rem] py-[0.25rem] rounded-full text-[0.7rem] uppercase tracking-[0.12em] bg-[linear-gradient(to_right,_rgba(56,189,248,0.7),_rgba(129,140,248,0.7),_rgba(236,72,153,0.7))] border border-[#94a3b8]/35 text-[#e5e7eb] dark:border-[#94a3b8]/35">
            <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
            Anonymous by design
          </span>

          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-[2rem] sm:text-[clamp(2.4rem,4.2vw,3.3rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
                A private link for
                <br />
                anonymous feedback.
              </h1>
              <p className="text-[0.98rem] max-w-[32rem] text-[var(--color-text-soft)] mx-auto lg:mx-0">
                HiddenInbox gives you a clean, private inbox for anonymous
                messages. Share your link and hear what people really think.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {token ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-[0.4rem] rounded-full font-medium border border-transparent cursor-pointer transition-all duration-150 ease-out outline-none hover:no-underline focus-visible:shadow-[0_0_0_1px_rgba(129,140,248,0.8),_0_0_0_10px_rgba(79,70,229,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none bg-[radial-gradient(circle_at_top_left,rgba(250,250,250,0.15),transparent_55%),linear-gradient(135deg,var(--color-primary),var(--color-primary-strong),var(--color-accent))] text-[#f9fafb] !text-white border-[rgba(191,219,254,0.4)] hover:-translate-y-[1px] active:translate-y-0 px-[1.8rem] py-[0.8rem] text-[0.98rem]"
                  >
                    Go to your inbox
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center gap-[0.4rem] rounded-full font-medium border border-transparent cursor-pointer transition-all duration-150 ease-out outline-none hover:no-underline focus-visible:shadow-[0_0_0_1px_rgba(129,140,248,0.8),_0_0_0_10px_rgba(79,70,229,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none bg-[radial-gradient(circle_at_top_left,rgba(250,250,250,0.15),transparent_55%),linear-gradient(135deg,var(--color-primary),var(--color-primary-strong),var(--color-accent))] text-[#f9fafb] !text-white border-[rgba(191,219,254,0.4)] hover:-translate-y-[1px] active:translate-y-0 px-[1.8rem] py-[0.8rem] text-[0.98rem] w-full sm:w-auto"
                    >
                      Get started
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-[0.4rem] rounded-full font-medium cursor-pointer transition-all duration-150 ease-out outline-none hover:no-underline focus-visible:shadow-[0_0_0_1px_rgba(129,140,248,0.8),_0_0_0_10px_rgba(79,70,229,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none bg-[var(--btn-secondary-bg)] border border-[rgba(148,163,184,0.4)] dark:border-[rgba(203,213,225,0.35)] text-[var(--color-text-soft)] shadow-[var(--shadow-subtle)] hover:border-[rgba(191,219,254,0.9)] hover:text-[var(--color-text)] px-[1.8rem] py-[0.8rem] text-[0.98rem] w-full sm:w-auto"
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>

              <p className="text-[0.9rem] text-[#9ca3af]">
                Complete profile control. You hold the keys to your handle and
                your messages.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-[24px] p-[1.75rem_1.5rem] md:p-[2rem_2rem] border border-[rgba(148,163,184,0.35)] shadow-[0_18px_45px_rgba(15,23,42,0.6)] backdrop-blur-[26px] bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
                How it works
              </p>
              <p className="text-[1.1rem] font-medium">From link to insight</p>
            </div>
            <div className="inline-flex items-center gap-[0.4rem] px-[0.7rem] py-[0.3rem] rounded-full border border-[var(--color-border-strong)] text-[0.75rem] text-[var(--color-text)] bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.32),_transparent_55%)]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
              System Active
            </div>
          </div>

          <div className="rounded-[16px] p-[1.25rem_1.2rem] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] space-y-2 mb-5">
            <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
              1. Share your link
            </p>
            <div className="inline-flex items-center gap-[0.4rem] px-[0.65rem] py-[0.4rem] rounded-full border border-[var(--color-border-strong)] bg-[var(--pill-link-bg)] text-[0.75rem] text-[var(--color-text)] cursor-default">
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
              <span>
                <span className="text-[0.8rem] text-[var(--color-text-soft)]">
                  hiddeninbox.me/
                </span>
                <strong className="font-medium">yourname</strong>
              </span>
            </div>
          </div>

          <div className="rounded-[16px] p-[1.25rem_1.2rem] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] space-y-3 mb-4">
            <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
              2. Receive notes
            </p>
            <p className="text-[#9ca3af] text-sm italic">
              Your latest presentation was incredibly insightful. Thanks for the
              inspiration!
            </p>
            <p className="text-[0.75rem] text-gray-500">Anonymous · just now</p>
          </div>

          <div className="space-y-3">
            <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500 ml-1">
              3. View insights
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-[16px] p-[1.25rem_1.2rem] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] space-y-2">
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                  Messages
                </p>
                <p className="text-[1.3rem] font-semibold text-[#e5e7eb]">27</p>
                <p className="text-[0.75rem] text-gray-500">Last 7 days</p>
              </div>
              <div className="rounded-[16px] p-[1.25rem_1.2rem] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] space-y-2">
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                  Latest activity
                </p>
                <p className="text-[1.3rem] font-semibold text-[#e5e7eb]">
                  12 mins ago
                </p>
                <p className="text-[0.75rem] text-gray-500">Most recent note</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
