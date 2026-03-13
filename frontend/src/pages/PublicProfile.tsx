import { useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { API_BASE_URL } from "../config";

export default function PublicProfile() {
  const { username } = useParams();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch(`${API_BASE_URL}/api/messages/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    await res.json();

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="relative rounded-[24px] p-[1.75rem_1.5rem] md:p-[2rem_2rem] bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] dark:bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] border border-[rgba(148,163,184,0.35)] shadow-[0_18px_45px_rgba(15,23,42,0.6)] backdrop-blur-[26px] max-w-md w-full">
        <div className="mb-4 text-center space-y-1">
          <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
            Send a message
          </p>
          <h2 className="text-2xl font-semibold">@{username}</h2>
          <p className="text-[0.9rem] text-[#9ca3af]">
            Share an honest, anonymous note. No login required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            className="w-full min-h-[140px] px-[0.9rem] py-[0.85rem] rounded-[1.2rem] border border-[rgba(148,163,184,0.7)] bg-[var(--textarea-bg)] text-[var(--color-text)] text-[0.9rem] outline-none resize-y shadow-[var(--textarea-shadow)] transition-all duration-150 ease-out focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary)] placeholder:text-[rgba(148,163,184,0.8)]"
            placeholder="Write something kind, helpful, or honest..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </Button>
        </form>

        {status === "success" && (
          <p className="text-[0.75rem] text-[var(--color-success)] mt-3 text-center">
            Message sent successfully
          </p>
        )}
        {status === "error" && (
          <p className="text-[0.75rem] text-[var(--color-danger)] mt-3 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
