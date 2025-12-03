import React, { useEffect, useState, useRef } from "react";
import "../styles/errorBanner.css"

export default function ErrorBanner({ message, duration = 5000, onClose }) {
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef(null);
  const removeTimeout = useRef(null);

  useEffect(() => {
    if (!message) return;

    // show banner
    setVisible(true);

    // start auto-hide timer
    hideTimeout.current = setTimeout(() => {
      setVisible(false);
    }, duration);

    // cleanup timers on unmount or when message changes
    return () => {
      clearTimeout(hideTimeout.current);
      clearTimeout(removeTimeout.current);
    };
  }, [message, duration]);

  // When visible changes from true -> false, call onClose after animation time
  useEffect(() => {
    if (!visible && message) {
      // match CSS animation-out duration (350ms)
      removeTimeout.current = setTimeout(() => {
        onClose?.();
      }, 350);
    }
  }, [visible, message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`error-banner-wrapper ${visible ? "enter" : "exit"}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-banner">
        <div className="error-icon" aria-hidden>
          ❗
        </div>

        <div className="error-text">
          <div className="error-title">Error</div>
          <div className="error-msg">{message}</div>
        </div>

        <button
          className="error-close"
          aria-label="Close error"
          onClick={() => {
            // start exit animation then call onClose via effect
            clearTimeout(hideTimeout.current);
            setVisible(false);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
