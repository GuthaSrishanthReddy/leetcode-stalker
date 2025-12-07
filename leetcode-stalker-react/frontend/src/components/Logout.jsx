import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../styles/logout.css";


export default function LogoutButton({ token, updateView, handleLogout }) {
  return (
    <div className="logout-wrapper">
      {token ? (
        <button
          className="logout-button"
          onClick={() => handleLogout()}>
            logout
        </button>
      ) : (
        <button
          className="login-button"
          onClick={() => updateView("login")}>
            login
        </button>
        )}
    </div>
  );
}
