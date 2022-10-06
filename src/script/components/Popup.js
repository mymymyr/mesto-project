export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeKey);
    this._popup.addEventListener('mousedown', this._handleOutsideContainer);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeKey);
    this._popup.removeEventListener('mousedown', this._handleOutsideContainer);
  }

  _handleEscapeKey = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOutsideContainer = (evt) => {
    if (evt.target === this._popup || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  getPopup() {
    return this._popup;
  }
}
