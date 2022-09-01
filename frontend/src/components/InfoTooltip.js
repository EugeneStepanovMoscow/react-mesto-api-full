import React from "react";

import errorImg from '../images/Error.svg'
import successImg from '../images/Success.svg'

function InfoTooltip({
  isOpen,
  onClose,
  status
  })
  {


  const name = 'info'
  const errorText = 'Что-то пошло не так! Попробуйте ещё раз.'
  const successText = 'Вы успешно зарегистрировались!'

  if (status) {
     return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_tooltips">
          <img className="popup__img" src={successImg} alt="Лого" />
          <h2 className="popup__text">{successText}</h2>
          <button className="popup__btn-close" id={`popup${name}BtnClose`} type="button" onClick={onClose}></button>
        </div>
      </div>
     )
  } else {
    return(
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_tooltips">
          <img className="popup__img" src={errorImg} alt="Лого" />
          <h2 className="popup__text">{errorText}</h2>
          <button className="popup__btn-close" id={`popup${name}BtnClose`} type="button" onClick={onClose}></button>
        </div>
       </div>
    )
  }
}

export default InfoTooltip
