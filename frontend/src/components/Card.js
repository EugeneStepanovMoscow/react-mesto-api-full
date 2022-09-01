import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  id,
  ownerId,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete})
 {

  // подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)
  // проверка на создателя карточки
  const isOwn = ownerId === currentUser._id;
  //переменная класса кнопки удаления карточки
  const cardDeleteButtonClassName = (`place__btn-delit ${isOwn ? '' : 'place__btn-delit_off'}`);
  //проверка на лайк карточки пользователем
  const isLiked = likes.some(elm => elm === currentUser._id)
  //переменная класса значка лайка
  const cardLikeButtonClassName = (`place__btn-like ${isLiked ? 'place__btn-like_active' : ''}`)

  //обработчик клика по карточке
  function handleClick() {
    onCardClick({ name, link })
  }
  //обработчик клика по лайку
  function handleLikeClick() {
    onCardLike(id, likes)
  }
  //обработчик нажатия кнопки удаления карточки
  function handleDeleteCard() {
   onCardDelete(id)
  }

  return (
    <li className="place">
      <button className="place__btn-view" type="button" onClick={handleClick}>
        <img className="place__image" src={link} alt={name} />
      </button>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteCard}></button>
      <div className="place__title">
        <h2 className="place__name">{name}</h2>
        <div className="place__likes-section">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <h3 className="place__likes">{likes.length}</h3>
        </div>
      </div>
    </li>
  )
}

export default Card
