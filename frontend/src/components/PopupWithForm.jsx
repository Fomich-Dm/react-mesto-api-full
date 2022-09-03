import React from "react";
import Popup from "./Popup";

const PopupWithForm = ({
  className,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} className={className}>
      <form
        className={`popup__info popup__info_${className}`}
        action="#"
        name={className}
        onSubmit={onSubmit}
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          className="popup__button popup__button_edit"
          aria-label="сохранить"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
