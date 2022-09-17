import React from "react";
import yes from "../images/yes.svg";
import no from "../images/no.svg";
import Popup from "./Popup";

const InfoTooltip = ({ isOpen, onClose, isInfoTooltip }) => {
  return (
    <Popup className="popup__tooltip" isOpen={isOpen} onClose={onClose}>
      <div className="popup__tooltip-info popup__info">
        <img
          className="popup__tooltip-image"
          src={isInfoTooltip ? yes : no}
          alt="статус регистрации"
        />
        <p className="popup__tooltip-title">
          {isInfoTooltip
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
