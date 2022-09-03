import React from "react";
import { useEffect } from "react";

const Popup = ({ isOpen, className, onClose, children, containerClass='' }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_${className} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className={containerClass? containerClass : 'popup__content'}>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
