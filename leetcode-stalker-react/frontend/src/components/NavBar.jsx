import "../styles/NavBar.css";
import logo from "../assets/LeetCode_logo.png";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className="navbar-left">
          <a className="navbar-brand" href="#" aria-label="Brand">
            <img
              className="navbar-logo"
              src={logo}
              alt="Logo"
            />
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
              {/* Hamburger Icon */}
              <svg
                className="icon-open"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>

              {/* Close Icon */}
              <svg
                className="icon-close"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>

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
            <a className="nav-link active" href="#">
              Stalk-em
            </a>
            <a className="nav-link" href="#">
              Account
            </a>
            <a className="nav-link" href="#">
              Work
            </a>
            <a className="nav-link" href="#">
              Blog
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
