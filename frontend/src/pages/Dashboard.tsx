import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { API_BASE_URL } from "../config";

interface Message {
  _id: string;
  text: string;
  createdAt: string;
}

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!storedUsername || !token) {
      window.location.href = "/login";
      return;
    }

    setUsername(storedUsername);
    fetchMessages(token);
  }, []);

  const fetchMessages = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setMessages(data);

      const statsRes = await fetch(`${API_BASE_URL}/api/messages/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (statsRes.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
        return;
      }

      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const statsRes = await fetch(`${API_BASE_URL}/api/messages/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const statsData = await statsRes.json();
    setStats(statsData);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API_BASE_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages(messages.filter((m) => m._id !== id));
    await refreshStats();
  };

  const profileLink = `${window.location.origin}/u/${username}`;

  return (
    <Layout>
      <section className="grid gap-[1.25rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6 lg:gap-8">
        <div className="space-y-8">
          <div className="relative rounded-[24px] p-[1.75rem_1.5rem] md:p-[2rem_2rem] bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] dark:bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] border border-[rgba(148,163,184,0.35)] shadow-[0_18px_45px_rgba(15,23,42,0.6)] backdrop-blur-[26px]">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
                  Dashboard
                </p>
                <h2 className="text-2xl font-semibold">
                  Welcome, {username} 👋
                </h2>
                <p className="text-[0.9rem] text-[#9ca3af] mt-2">
                  Your anonymous inbox, with simple stats and a shareable link.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
                Your public link
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-[0.4rem] px-[0.65rem] py-[0.4rem] rounded-full border border-[var(--color-border-strong)] bg-[var(--pill-link-bg)] text-[0.75rem] text-[var(--color-text)] hover:no-underline"
                  onClick={() => {
                    navigator.clipboard.writeText(profileLink);
                    alert("Profile link copied!");
                  }}
                >
                  <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
                  <span>
                    <span className="text-[0.8rem] text-[var(--color-text-soft)]">
                      {window.location.origin}/u/
                    </span>
                    <strong className="font-medium">{username}</strong>
                  </span>
                </button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(profileLink);
                    alert("Profile link copied!");
                  }}
                >
                  Copy link
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] p-[1.25rem_1.2rem] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px]">
            <h3 className="text-[1.1rem] font-medium mb-3">Your messages</h3>

            {loading ? (
              <p className="text-[#9ca3af] text-sm">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-[#9ca3af] text-sm">
                No messages yet. Share your link to start receiving anonymous
                notes.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className="rounded-[16px] p-[1.25rem_1.2rem] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] space-y-2"
                  >
                    <p>{m.text}</p>
                    <p className="text-[0.75rem] text-gray-500">
                      {new Date(m.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(m._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {stats && (
          <aside className="space-y-4">
            <div className="rounded-[16px] p-[1.25rem_1.2rem] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px]">
              <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500 mb-2">
                Overview
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                    Total
                  </p>
                  <p className="text-[1.3rem] font-semibold text-[#e5e7eb]">
                    {stats.total}
                  </p>
                </div>
                <div>
                  <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                    Last 7 days
                  </p>
                  <p className="text-[1.3rem] font-semibold text-[#e5e7eb]">
                    {stats.last7Days}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] p-[1.25rem_1.2rem] bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] dark:bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.08),transparent_55%),rgba(15,23,42,0.6)] border border-[rgba(148,163,184,0.35)] shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur-[18px] space-y-3">
              <div>
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                  First message
                </p>
                <p className="text-[0.75rem] text-gray-500">
                  {stats.firstMessageDate
                    ? new Date(stats.firstMessageDate).toLocaleDateString(
                        "en-IN",
                      )
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-[0.8rem] uppercase tracking-[0.14em] text-gray-500">
                  Latest message
                </p>
                <p className="text-[0.75rem] text-gray-500">
                  {stats.latestMessageDate
                    ? new Date(stats.latestMessageDate).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "-"}
                </p>
              </div>
            </div>
          </aside>
        )}
      </section>
    </Layout>
  );
}
