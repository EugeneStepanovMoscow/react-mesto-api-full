import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom'

import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

import Main from '../components/Main'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';


function App() {
  //стейт переменный состояния открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  //стейт переменна статуса попапа подсказки
  const [infoTooltipStatus, setInfoTooltioStatus] = useState(true)

  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')
  //стейт переменная массива информации о карточках
  const [cards, setCards] = React.useState([])
  //стейт переменная статуса входа пользавателя в систему
  const [loggedIn, setloggedIn] = React.useState(false)

  const history = useHistory()

  // обработчик нажатия кнопки аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  // обработчик нажатия кнопки редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  // обработчик нажатия кнопки добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  // обработчик попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard(null)
  }
  // обработчик клика на картинку
  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard)
  }
  //обработчик изменения профиля пользователя
  function handleUpdateUser({name, description}) {
    api.givePersonInfo(name, description) //отправляем изменения на сервер
      .then(res => {
        setCurrentUser(res) //ответ с сервера записываем в стейт переменную
        closeAllPopups()
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //обработчик добавления карточки
  function handleAddPlace({name, link}) {
    api.sendCard(name, link) //отправляем изменения на сервер
      .then(newCard => {
        console.log(newCard)
        setCards([{
          //приведение ключей объекта карточки к стандартному виду
          id: newCard._id,
          ownerId: newCard.owner,
          name: newCard.name,
          link: newCard.link,
          likes: newCard.likes
          }, ...cards
        ])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    api.getAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //обработчик лайка карточки
  function handleCardLike(cardId, likes) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(elm => elm === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточк и меняем в стейт
    api.changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        //debugger
        setCards(cards.map((oldCard) => oldCard.id === cardId ? {
          id: newCard._id,
          ownerId: newCard.owner,
          name: newCard.name,
          link: newCard.link,
          likes: newCard.likes} : oldCard
        ))
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
  }

  //обработчик удаления карточки
  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c.id !== cardId ))
      })
      .catch(err => {
        console.log(err)
      })
  }

  //функция входа
  function handleLogin(email, password) {
    api.login(password, email)
      .then((res) => {
        if (!res) {
          console.log(`Ошибка запроса входа`)
        } else {
          setUserEmail(email)
          setloggedIn(true)
          localStorage.setItem('jwt', res.token)
          history.push('/main')
          window.location.reload()
        }
      })
      .catch(err => {
        setInfoTooltioStatus(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      })
  }
  //проверка токена
  function handleLoginStart() {
    if (localStorage.jwt) {
      api.jwtCheck(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email)
          setloggedIn(true)
          history.push('/main')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  //функция регистарции пользователя на сервере
  function handleRegister(email, password) {
    api.register(password, email)
      .then((res) => {
        if (res.statusCode === 400) {
          setInfoTooltioStatus(false)
          setIsInfoTooltipOpen(true)
        } else {
          //действия при успешной регистрации
          setInfoTooltioStatus(true)
          setIsInfoTooltipOpen(true)
          history.push('/login')
        }
      })
      .catch(err => {
        setInfoTooltioStatus(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      })
  }
  //функция выхода пользователя
  function handleLogOut() {
    setloggedIn(false)
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  //Запрос данных пользователя с сервера при старте
  useEffect(() => {
    api.getPersonInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //Запрос данных карточек с сервера с записью в массив cards при старте
  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res.map(card => ({
          id: card._id,
          ownerId: card.owner,
          name: card.name,
          link: card.link,
          likes: card.likes})))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute
          path="/main"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onExit={handleLogOut}
          email={userEmail}
        />

        <Route path="/login">
          <Login
            onLogin={handleLogin}
            onStart={handleLoginStart}
          />
        </Route>
        <Route path="/register">
          <Register
            onRegister={handleRegister}
          />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main"/> : <Redirect to="/login"/>}
        </Route>
      </Switch>

        <section className="popups">
          {/*попап редактирования аватара*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}

          />
          {/*попап редактирование профиля*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/*попап добавления карточки*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          {/* Просмотр карточки */}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            status={infoTooltipStatus}
          />
        </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
