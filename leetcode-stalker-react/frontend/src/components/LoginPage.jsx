import React, { useState } from "react";
import "../styles/loginPage.css";

function LoginPage({ onLogin, error, updateView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login-input"
            />
          </div>

          <div className="input-wrapper">
            <div className="password-row">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
              />

              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-btn-wrapper">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="forgot-password-wrapper">
          Don't have an account?
          <a
            onClick={(e) => {
              e.preventDefault();
              updateView("register");
            }}
          >
            Register here.
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
