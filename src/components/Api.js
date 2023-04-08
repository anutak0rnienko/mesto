export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    getInitialCardsApi() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => this._checkResponse(res))
    }

    getUserInfoApi() {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers
          })
          .then(res => this._checkResponse(res))
    }

    addCardElements(data) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data),
        })
        .then(res => this._checkResponse(res))
      }

      editProfile(data) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data)
        })
        .then(res => this._checkResponse(res))
      }

      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(res => this._checkResponse(res))
      }

      putCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then(res => this._checkResponse(res))
      }

      deleteCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(res => this._checkResponse(res))
      }      

      /**Проверить на ошибки */
    _checkResponse(res) {
        if (res.ok) {
            console.log('vse ok')
            return res.json();
        }
        return Promise.reject(`Упс.... Что-то пошло не так! Ошибка: ${res.status}`);
  }
}



