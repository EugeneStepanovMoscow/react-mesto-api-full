import React from "react";

function ImagePopup({
  card,
  onClose
}) {
  if (card !== null) {
    return (
      <div className="popup popup_opened" id="popupPlaceView">
        <div className="popup__container popup__container_type_place-view">
          <figure className="popup__figure">
            <img className="popup__image" src={card.link} alt={card.name} />
            <figcaption className="popup__figcaption">{card.name}</figcaption>
          </figure>
          <button className="popup__btn-close" id="popupPlaceViewBtnClose" type="button" onClick={onClose}></button>
        </div>
      </div>
    )
  }
}

export default ImagePopup
