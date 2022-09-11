export const BASE_URL = "http://api.mesto.FominDmitriy.nomorepartiesxyz.ru";

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(checkResponse)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(checkResponse)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        }
    }).then(checkResponse)
}