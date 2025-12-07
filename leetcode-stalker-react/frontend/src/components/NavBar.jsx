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
  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className="navbar-left">
          <a
            href="#"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              updateView('home');
            }}
            aria-label="Brand"
          >
            <img className="navbar-logo" src={logo} alt="Logo" />
            <span className="navbar-title">Stalk-em</span>
          </a>


          <div className="navbar-toggle-wrapper">
            <button
              type="button"
              className="navbar-toggle"
              id="navbar-collapse-btn"
              aria-expanded="false"
              aria-controls="navbar-menu"
              aria-label="Toggle navigation"
              data-hs-collapse="#navbar-menu"
            >
              

              {/* Close Icon */}

              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          id="navbar-menu"
          className="navbar-menu"
          aria-labelledby="navbar-collapse-btn"
        >
          <div className="navbar-links">

            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                updateView('dashboard');
              }}
            >
              Dashboard
            </a>
          </div>
        </div>
        
        <div className="navbar-right">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === "light" ? "⏾" : "✹"}
          </button>

          <Logout handleLogin={handleLogin} handleLogout={handleLogout} token={isLoggedIn} updateView={updateView} />
        </div>
      </nav>
    </header>
  );
}
