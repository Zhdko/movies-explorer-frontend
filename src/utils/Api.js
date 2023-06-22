import { BASE_URL } from './constants';

export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, method, body) {
    const options = {
      headers: this._headers,
      credentials: 'include',
      method,
    };
    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options).then(this._checkResponce);
  }

  getUserData() {
    const userInfoUrl = `${this._baseUrl}/users/me`;
    return fetch(userInfoUrl, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponce(res));
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
    }).then((res) => this._checkResponce(res));
  }

  addToFavorites(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: 'https://api.nomoreparties.co' + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + data.image.previewUrl,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => this._checkResponce(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponce(res));
  }

  _setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponce(res));
  }

  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._checkResponce(res));
  }

  toggleLike(cardId, isLiked) {
    console.log(isLiked);
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponce(res));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
