export default class Popup {
  constructor(selector){
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeKey.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeKey.bind(this));
  }
// надо починить закрытие через эскейп
  _handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }
}
