import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._form.querySelector(".popup__save-button");
    this._handleSubmitForm = handleSubmitForm;
  }

  renderLoading(isLoading, buttonText = "Сохранить") {
    if (isLoading) {
      this._submitBtn.textContent = "Сохранение...";
    } else {
      this._submitBtn.textContent = buttonText;
    }
  }

  close() {
    super.close();
  }

  _getInputValues() {
    this._inputLists = this._form.querySelectorAll(".popup__item");
    this._inputValues = {};
    this._inputLists.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this._form.reset();
    });
  }
}
