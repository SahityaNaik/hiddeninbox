import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PublicProfile from "./pages/PublicProfile";

type Theme = "light" | "dark";

export default function App() {
  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as Theme) || "light";
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/u/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
