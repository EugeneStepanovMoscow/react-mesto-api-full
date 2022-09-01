import React from 'react';

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit})

  {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`popup${name}`}
          id={`popup${name}`}
          onSubmit={onSubmit}
        >
          <fieldset className="popup__fieldset">
            {children}
            <button className="popup__btn-save" type="submit">{buttonText}</button>
          </fieldset>
        </form>
        <button className="popup__btn-close" id={`popup${name}BtnClose`} type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm
