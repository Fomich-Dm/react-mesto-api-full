import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function heandleChangeName(e) {
    setName(e.target.value);
  }

  function heandleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      className="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input popup__input_type_name"
        value={name || ""}
        onChange={heandleChangeName}
        id="name-profile"
        type="text"
        name="name"
        placeholder="Ваше имя"
        required
      />
      <span className="name-profile-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        value={description || ""}
        onChange={heandleChangeDescription}
        id="name-profession"
        type="text"
        name="about"
        placeholder="Ваша профессия"
        required
      />
      <span className="name-profession-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
