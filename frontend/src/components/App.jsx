import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvaterPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { authorize, getContent, register } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "" });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    tokenCheck();
    api
      .getUserInfo()
      .then((date) => {
        setCurrentUser(date);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getAllCards()
      .then((date) => {
        setCards(date);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRegister = (email, password) => {
    register(email, password)
      .then((data) => {
        setUserData({
          email: data.email,
        });
        setLoggedIn(true);
        navigate("/sign-in");
        handleRegisterClick();
      })
      .catch((err) => {
        console.log(err);
        handleRegisterClick();
      });
  };

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUserData({
          email: email,
        });
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({
      email: "",
    });
    setLoggedIn(false);
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getContent(token)
        .then((res) => {
          setUserData({
            email: res.data.email,
          });
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegisterClick() {
    setInfoTooltipOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((date) => {
        setCurrentUser(date);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editUserAvatar(data)
      .then((date) => {
        setCurrentUser(date);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewPlace(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Header>
                    <p className="header__email">{userData.email}</p>
                    <li>
                      <Link
                        to={"/sign-in"}
                        className="header__link"
                        onClick={handleLogout}
                      >
                        Выйти
                      </Link>
                    </li>
                  </Header>
                  <Main
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onCardClick={handleCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopup}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopup}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopup}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                  />
                  <PopupWithForm
                    className="delete-image"
                    title="Вы уверены?"
                  ></PopupWithForm>
                  <ImagePopup card={selectedCard} onClose={closeAllPopup} />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopup}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  handleLogin={handleLogin}
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopup}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopup}
            loggedIn={loggedIn}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
