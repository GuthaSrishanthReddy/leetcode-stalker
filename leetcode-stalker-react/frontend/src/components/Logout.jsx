import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../styles/logout.css";





function MagneticButton({ children = "Hover Me", className = "", handleAction }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-20, 20], [10, -10]);
  const rotateY = useTransform(x, [-20, 20], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
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
      style={{
        x,
        y,
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function LogoutButton({handleLogin, handleLogout, token , updateView}) {
  return (
    <div className="magnet-container">
      {token?
      (<MagneticButton className="logout-button" handleAction={handleLogout}>Logout</MagneticButton>):
    (<MagneticButton className="login-button" handleAction={handleLogin} onClick={() => updateView("login")}>Login</MagneticButton>)}
    </div>
  );
}
