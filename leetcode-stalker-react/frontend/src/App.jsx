import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import { loginUser } from "./api/auth.js";
import {jwtDecode} from 'jwt-decode'



function App() {
  const [view, setView] = useState(localStorage.getItem("view") || "home");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const expMs = decoded.exp * 1000;
    const now = Date.now();
    const timeLeft = expMs - now;

    if (timeLeft <= 0) {
      handleLogout();
      return;
    }

    const timer = setTimeout(() => {
      handleLogout();
      alert("Session Expired!");
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [localStorage.getItem("token")]);

  function updateView(viewName) {
    setView(viewName);
    localStorage.setItem("view", viewName);
  }


  async function handleLogin(email, password) {
    try {
      setError(null);
      const response = await loginUser(email, password);
      const { token } = response.data;

      localStorage.setItem("token", token);

      updateView("dashboard");

    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    updateView("login");
  }


  const [globalError, setGlobalError] = useState("")


  return (
    <>
      
      <Navbar
        isLoggedIn={!!localStorage.getItem("token")}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        updateView={updateView}
      />

      <ErrorBanner message={error} />

      {view === "home" && <Home />}
      {view === "login" && <LoginPage onLogin={handleLogin}  error={error} updateView={updateView} />}
      {view === "dashboard" && <Dashboard setGlobalError = {setGlobalError} globalError = {globalError}/>}
      {view === "register" && (
        <RegisterPage onSuccessfulRegister={() => updateView("login")} updateView={updateView} />
      )}
    </>
  );
}



export default App;