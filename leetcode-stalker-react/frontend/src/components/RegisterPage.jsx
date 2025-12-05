import React, { useState } from "react";
import "../styles/registerPage.css";
// import { registerUser } from "../api/auth.js";
import Silk from './Silk';
import { GridScan } from "./GridScan";


function RegisterPage({ onSuccessfulRegister, updateView, theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(email, password);
      const { token } = response.data;
      localStorage.setItem("token", token);
      onSuccessfulRegister();
    } catch (err) {
      setError(err?.response?.data?.message || "Sign up failed");
    }
  }

  return (
    <div className="register-wrapper" style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }}>

      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,

      }}>
      {theme === "dark"?
        <Silk
          key={theme}   // <- forces full remount
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        /> :
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      } 
        
        
      </div>
      <div className="register-container">

        <h1 className="register-title">Create Account</h1>

        <form onSubmit={handleRegister} className="register-form">

          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="register-input"
            />
          </div>

          <div className="input-wrapper">
            <div className="password-row">
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="register-input password-field"
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

            </div>
          </div>

          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="register-input"
            />
          </div>

          <div className="register-btn-wrapper">
            <button type="submit" className="register-btn">
              Sign Up
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="have-account-wrapper">
          Already have an account?
          <a
            className="login-title"
            onClick={(e) => {
              e.preventDefault();
              updateView("login");
            }}
          >
            Login here.
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
