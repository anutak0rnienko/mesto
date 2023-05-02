export default class Api {
    constructor(apiConfig) {
        this._url = apiConfig.url;
        this._headers = apiConfig.headers;
        this._authorization = apiConfig.headers['authorization'];
    }

getInitialCardsApi() {
  return fetch(`${this._url}/cards`, {
    method: 'GET',
    headers: {
      authorization: this._authorization
    },
    })
  .then(res => this._checkError(res))
}

    getUserInfoApi() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
          })
          .then(res => this._checkError(res))
    }

    addCardElements(data) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data),
        })
        .then(res => this._checkError(res))
      }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          })
        })
        .then(res => this._checkError(res))
      }

      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(res => this._checkError(res))
      }

      putCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then(res => this._checkError(res))
      }

      deleteCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(res => this._checkError(res))
      }      

      editProfileAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data),
        }).then(res => this._checkError(res))
      }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так:( Ошибка: ${res.status}`);
  }
}



