import { useState } from "react";
import "../styles/NavBar.css"; 
import logo from "../assets/LeetCode_logo.png"; 
import Logout from "./logout.jsx";

export default function Navbar({
  isLoggedIn,
  handleLogout,
  handleLogin,
  updateView,
  toggleTheme,
  theme
}) {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="navbar-header">
      <nav className="navbar-container">

        <div className="navbar-left">
          <a
            href="#"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              updateView("home");
            }}
          >
            <img className="navbar-logo" src={logo} alt="Logo" />
            <span className="navbar-title">Stalk-em</span>
          </a>
        </div>

        <div className="navbar-links">

          {/* --- Asana-style Dropdown --- */}
            <div 
              className="menu-item"
              onMouseEnter={() => setOpenMenu(true)}
              onMouseLeave={() => setOpenMenu(false)}
            >

            <button
              className="menu-trigger"
              onClick={() => setOpenMenu(!openMenu)}
            >
              Dashboard
            </button>

            <div className={`dropdown-panel ${openMenu ? "open" : ""}`}>
              <a onClick={() => updateView("dashboard")}>LeetCode Dashboard</a>
              <a onClick={() => updateView("dashboard")}>CodeForces Dashboard</a>
            </div>
          </div>

        </div>

        <div className="navbar-right">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "⏾" : "✹"}
          </button>

          <Logout
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            token={isLoggedIn}
            updateView={updateView}
          />
        </div>

      </nav>
    </header>
  );
}
