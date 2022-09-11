class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addNewPlace(data) {
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  likeStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    }
  }

}

const api = new Api({
  url: "http://api.mesto.FominDmitriy.nomorepartiesxyz.ru",
});

export default api;
