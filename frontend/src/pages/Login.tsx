import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/dashboard";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="relative rounded-[24px] p-[1.75rem_1.5rem] md:p-[2rem_2rem] bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] dark:bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.18),transparent_55%),rgba(15,23,42,0.75)] border border-[rgba(148,163,184,0.35)] shadow-[0_18px_45px_rgba(15,23,42,0.6)] backdrop-blur-[26px] max-w-md w-full">
          <div className="mb-6 text-center space-y-1">
            <p className="text-[0.9rem] uppercase tracking-[0.18em] text-gray-500">
              Welcome back
            </p>
            <h2 className="text-2xl font-semibold">Sign in to HiddenInbox</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              showPasswordToggle={true}
              required
            />

            <Button type="submit" className="w-full mt-3" size="lg">
              Login
            </Button>
          </form>

          <p className="text-sm text-center mt-4 text-[#9ca3af]">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-[var(--color-text)] font-medium relative px-[0.35rem] after:content-[''] after:absolute after:inset-x-[0.45rem] after:-bottom-[0.2rem] after:h-[2px] after:rounded-full after:bg-[linear-gradient(to_right,rgba(96,165,250,0.4),rgba(147,51,234,0.5))] after:origin-center after:scale-x-100 after:opacity-100 after:transition-all after:duration-150 after:ease-out"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
