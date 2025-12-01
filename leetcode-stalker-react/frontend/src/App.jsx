import { useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/NavBar.jsx";

function App() {
  const [view, setView] = useState("register");

  return (
    <div>
      <Navbar/>
      {view === "login" && (
        <LoginPage onSuccessfulLogin={() => setView("dashboard")} />
      )}

      {view === "dashboard" && (
        <Dashboard/>
      )}

      {view === "register" && (
        <RegisterPage onSuccessfulRegister={() => setView("login")} />
      )}

    </div>
  );
}

export default App;
