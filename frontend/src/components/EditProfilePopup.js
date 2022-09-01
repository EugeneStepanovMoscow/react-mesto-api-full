import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser})

  {
  //стейт переменные имя и профессия (привязаны к соответствующим инпутам)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  //подписка на контекст currentUser
  const currentUser = React.useContext(CurrentUserContext)
  //присвоение стейт переменным значений currentUser, при изменении последнего
  React.useEffect(() =>{
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  //обработчик инпута имя
  function handleNameChange(event) {
    setName(event.target.value)
  }
  //обработчик инпута профессия
  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }
  //обработчик сабмита формы
  function handleSubmit(event) {
    event.preventDefault()
    onUpdateUser({
      name,
      description
    })
  }


  return (
    <PopupWithForm
      name="ProfileEdit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      children={
        <>
          <input
            className="popup__inp"
            name="name"
            type="text"
            placeholder="Введите имя"
            required
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__inp-errmsg inperr-name"></span>
          <input
            className="popup__inp"
            name="description"
            type="text"
            placeholder="Укажите профессию"
            required
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__inp-errmsg inperr-description"></span>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditProfilePopup
