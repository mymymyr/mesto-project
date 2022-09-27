export default class Popup {
  constructor(popup){
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  _handleEscapeKey() {
    if (evt.key !== 'Escape') {
      this.close();
    }
  }

  _clickOverlay() {
    if (this.evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._clickOverlay);
  }
}
