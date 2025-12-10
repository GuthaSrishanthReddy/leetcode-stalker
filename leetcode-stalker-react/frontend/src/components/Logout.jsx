import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../styles/logout.css";
import { Navigate } from "react-router-dom";


export default function LogoutButton({ token, handleLogout }) {
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
          onClick={() => Navigate("/login")}>
            login
        </button>
        )}
    </div>
  );
}
