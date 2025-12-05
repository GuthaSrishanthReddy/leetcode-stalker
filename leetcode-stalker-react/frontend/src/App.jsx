import { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import { loginUser } from "./api/auth.js";
import "./app.css"

function App() {
  const [view, setView] = useState(localStorage.getItem("view") || "home");
  const [globalError, setGlobalError] = useState(null);

  // THEME
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  function updateView(viewName) {
    setView(viewName);
    localStorage.setItem("view", viewName);
  }

  async function handleLogin(email, password) {
    try {
      setGlobalError(null);
      const response = await loginUser(email, password);
      const { token } = response.data;

      localStorage.setItem("token", token);
      updateView("dashboard");
    } catch (err) {
      setGlobalError(err?.response?.data?.message || "Login failed");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    updateView("login");
  }

  return (
    <div className={theme}>
      <Navbar
        isLoggedIn={!!localStorage.getItem("token")}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        updateView={updateView}
        toggleTheme={toggleTheme}
        theme={theme}
        view={view}
      />

      <ErrorBanner message={globalError} />

      {view === "home" && <Home />}
      {view === "login" && (
        <LoginPage
          onLogin={handleLogin}
          error={globalError}
          updateView={updateView}
          theme={theme}
        />
      )}

      {view === "dashboard" && (
        <Dashboard
          setGlobalError={setGlobalError}
          globalError={globalError}
          updateView={updateView}
          theme={theme}
        />
      )}

      {view === "register" && (
        <RegisterPage
          onSuccessfulRegister={() => updateView("login")}
          updateView={updateView}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
