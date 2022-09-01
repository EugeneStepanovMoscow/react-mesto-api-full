import React from 'react';
import penImg from '../images/Pen.svg'
import plusImg from '../images/Plus.svg'
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onClick,
  cards,
  onCardLike,
  onCardDelete,
  onExit,
  email
  })
  {

  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <>
    <Header
      headerButtonText={'Выход'}
      userEmail={email}
      headerLink={'/login'}
      onExit={onExit}
      email={email}
    />
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          {/* Аватар пользователя */}
          <div className="profile__avatar">
            <img className="profile__image" src={currentUser.avatar} alt="Аватар" />
            <button className="profile__avatar-btn-edit" type="button" onClick={onEditAvatar}>
              <img className="profile__avatar-btn-edit-img" src={penImg} alt="Карандаш" />
            </button>
          </div>
          {/* информация о пользователе */}
          <div className="profile__info">
            <h1 className="profile__person-name">{currentUser.name}</h1>
            <button className="profile__btn-edit" type="button" onClick={onEditProfile}>
              <img className="profile__btn-edit-img" src={penImg} alt="Карандаш" />
            </button>
            <p className="profile__person-description">{currentUser.about}</p>
          </div>
        </div>
        {/* кнопка добавления места */}
        <button className="profile__btn-add" type="button" onClick={onAddPlace}>
          <img className="profile__btn-add-img" src={plusImg} alt="Плюс" />
        </button>
      </section>
      <section className="places">
        {/* Контейнер для карточек */}
        <ul className="places__table">
          {cards.map(({ id, ownerId, name, link, likes }) =>
            <Card
              key={id}
              id={id}
              ownerId={ownerId}
              name={name}
              link={link}
              likes={likes}
              onCardClick={onClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)
          }
        </ul>
      </section>
    </main>
    <Footer/>
    </>
  )
}

export default Main
