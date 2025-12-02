import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../styles/logout.css";

function MagneticButton({ children, className = "", onClick }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-2, 2], [1, -1]);
  const rotateY = useTransform(x, [-2, 2], [-1, 1]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - (rect.x + rect.width / 2));
    mouseY.set(e.clientY - (rect.y + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`magnet-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, rotateX, rotateY }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function LogoutButton({ token, updateView, handleLogout }) {
  return (
    <div className="logout-wrapper">
      {token ? (
        <MagneticButton
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </MagneticButton>
      ) : (
        <MagneticButton
          className="login-button"
          onClick={() => updateView("login")}
        >
          Login
        </MagneticButton>
      )}
    </div>
  );
}
