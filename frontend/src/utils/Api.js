class API {
  constructor(url, regUrl, headers) {
    this._baseUrl = url;
    this._baseRegUrl = regUrl;
    this._headers = headers;
  }
  _makeRequest(promise) {
    return promise.then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .then((obj) => {
      return obj
    })
  }
//---------------------Получение карточки
  getCards() {
    const promise = fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })
    return this._makeRequest(promise)
  }
//---------------------Получение информации о пользователе
  getPersonInfo() {
    const promise = fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    return this._makeRequest(promise)
  }
//---------------------Отправка нового аватара
  getAvatar(avatar) {
    const promise = fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  return this._makeRequest(promise)
  }
//---------------------Добавление лайков на карточку
  // addLikes(cardId) {
  //   const promise = fetch(`${this._baseUrl}cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: this._headers
  //   })
  //   return this._makeRequest(promise)
  // }
//----------------------Удаление лайков на карточку
  // deleteLikes(cardId) {
  //   const promise = fetch(`${this._baseUrl}cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: this._headers
  //   })
  //   return this._makeRequest(promise)
  // }
//изменение статуса лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      const promise = fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      return this._makeRequest(promise)
    } else {
      const promise = fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      return this._makeRequest(promise)
    }
  }

//---------------------Удаление карточки
  deleteCard(cardId) {
    const promise = fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    return this._makeRequest(promise)
  }
//---------------------Отправка карточки
  sendCard(name, link) {
    const promise = fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    return this._makeRequest(promise)
  }
//---------------------Передача информации о профиле
  givePersonInfo(newName, newAbout) {
    const promise = fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    return this._makeRequest(promise)
  }
  //запрос на регистрацию нового пользователя на сайт
  register(password, email) {
    const promise = fetch(`${this._baseRegUrl}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    return this._makeRequest(promise)
  }
  //запрос на вход, получение токена
  login(password, email) {
    // const promise = fetch(`${this._baseRegUrl}/signin`, {
    const promise = fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    return this._makeRequest(promise)
  }
  //запрос проверки токена
  jwtCheck(jwt) {
    const promise = fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${jwt}`
        'authorization': jwt,
      }
    })
    return this._makeRequest(promise)
  }


}
// const api = new API('https://mesto.nomoreparties.co/v1/cohort-40/', 'https://auth.nomoreparties.co', {
//  http://api.steugene.nomoredomains.sbs:3000/
//  http://localhost:3000/
const api = new API('http://localhost:3000/', 'http://localhost:3000/', {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'authorization': localStorage.jwt
})

export default api
