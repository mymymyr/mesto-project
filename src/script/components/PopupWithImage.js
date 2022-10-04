import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, popupViewImg, popupViewText}){
    super(popupSelector);
    this._popupViewImg = this._popup.querySelector(popupViewImg);
    this._popupViewText = this._popup.querySelector(popupViewText);
  }

  open(name, link) {
    super.open();
    this._popupViewImg.src = link;
    this._popupViewImg.alt = name;
    this._popupViewText.textContent = name;
  }
}
