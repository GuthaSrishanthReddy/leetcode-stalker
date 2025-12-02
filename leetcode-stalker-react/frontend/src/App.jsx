import { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import { loginUser } from "./api/auth.js";


function App() {
  const [view, setView] = useState(localStorage.getItem("view") || "home");
  const [error, setError] = useState(null);

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

  return (

    <>
      
      <Navbar
        isLoggedIn={!!localStorage.getItem("token")}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        updateView={updateView}
      />

      {view === "home" && <Home />}
      {view === "login" && <LoginPage onLogin={handleLogin}  error={error} updateView={updateView} />}
      {view === "dashboard" && <Dashboard />}
      {view === "register" && (
        <RegisterPage onSuccessfulRegister={() => updateView("login")} />
      )}
    </>
  );
}



export default App;