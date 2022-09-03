import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ card, onClose }) => {
  return (
    <Popup containerClass='popup__content-img' className={"image"} isOpen={card._id} onClose={onClose}>
      <img className="popup__img" alt={card.name} src={card.link} />
      <h2 className="popup__title-place">{card.name}</h2>
    </Popup>
  );
};

export default ImagePopup;
