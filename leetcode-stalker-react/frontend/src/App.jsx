import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";

import { loginUser } from "./api/auth.js";
import "./app.css";

function App() {
  const navigate = useNavigate();

  // ERROR SYSTEM
  const [globalError, setGlobalError] = useState(null);

  // THEME SYSTEM
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  // LOGIN HANDLER
  async function handleLogin(email, password) {
    try {
      setGlobalError(null);

      const response = await loginUser(email, password);
      const { token } = response.data;

      const extractedUser = email.split("@")[0];
      localStorage.setItem("token", token);
      localStorage.setItem("username", extractedUser);

      navigate("/dashboard");
    } catch (err) {
      setGlobalError(err?.response?.data?.message || "Login failed");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className={theme}>
      <Navbar
        isLoggedIn={!!localStorage.getItem("token")}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <ErrorBanner message={globalError} />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              error={globalError}
              theme={theme}
            />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            <RegisterPage
              onSuccessfulRegister={() => navigate("/login")}
              theme={theme}
            />
          }
        />

        {/* DASHBOARD (Protected) */}
        <Route
          path="/dashboard"
          element={<Dashboard theme={theme} globalError={globalError} setGlobalError={setGlobalError} />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
