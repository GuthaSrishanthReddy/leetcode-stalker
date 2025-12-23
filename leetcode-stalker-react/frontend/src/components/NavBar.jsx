import { useState } from "react";
import "../styles/NavBar.css"; 
import logo from "../assets/LeetCode_logo.png"; 
import Logout from "./logout.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar({
  isLoggedIn,
  handleLogout,
  handleLogin,
  toggleTheme,
  theme
}) {
  const Navigate = useNavigate()
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
              Navigate("/home");
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

            <a onClick={() => Navigate("/dashboard")}>LeetCode Dashboard</a>
            <a onClick={() => Navigate("/dashboard")}>CodeForces Dashboard</a>
            <div className={`dropdown-panel ${openMenu ? "open" : ""}`}>
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
          />
        </div>

      </nav>
    </header>
  );

}
