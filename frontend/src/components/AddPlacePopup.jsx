import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = React.useState("");
  const [place, setPlace] = React.useState("");

  React.useEffect(() => {
    setName("");
    setPlace("");
  }, [isOpen]);

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddPlace(e) {
    setPlace(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: place,
    });
  }

  return (
    <PopupWithForm
      className="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Создание..." : "Создать"}
    >
      <input
        className="popup__input popup__input_type_place"
        value={name}
        onChange={handleAddName}
        id="name-card"
        type="text"
        name="name"
        placeholder="Название места"
        required
      />
      <span className="name-card-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_image"
        value={place}
        onChange={handleAddPlace}
        id="link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
