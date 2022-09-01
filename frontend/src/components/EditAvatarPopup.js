import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar})
  {

  const avatarRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    onUpdateAvatar(avatarRef.current.value)
  }

  React.useEffect(() =>{
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      name="ProfileImgEdit"
      title="Обновить аватар"
      buttonText="Сохранить"
      children={
        <>
          <input
            className="popup__inp"
            name="name"
            type="url"
            defaultValue=""
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span className="popup__inp-errmsg inperr-name popup__inp-errmsg_active"></span>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup
