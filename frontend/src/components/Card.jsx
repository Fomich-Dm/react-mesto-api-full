import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);


  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `cards__delete ${
    isOwn ? "cards__delete_active" : ""
  }`;

  const cardLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="cards__item">
      <img
        className="cards__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить место"
        onClick={handleDeleteClick}
      />
      <div className="cards__info">
        <h2 className="cards__name">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
