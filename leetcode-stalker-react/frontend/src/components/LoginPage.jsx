import React, { useState } from "react";
import "../styles/loginPage.css";
import Silk from "./Silk";
import { GridScan } from "./GridScan";

function LoginPage({ onLogin, error, updateView, theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login-wrapper">

      {/* Silk Background */}
      <div className="silk-bg">
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
          linesColor="#ffffff"
          gridScale={0.1}
          scanColor="#000000"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      }

      </div>

      {/* Glass Card */}
      <div className="login-container">

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <input
            type="email"
            className="login-input"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with Show/Hide button */}
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input password-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="login-btn" type="submit">Login</button>

          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="switch-page">
          Don’t have an account?
          <a onClick={() => updateView("register")}> Register here.</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
