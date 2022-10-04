import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._form.querySelector(".popup__save-button");
    this._handleSubmitForm = handleSubmitForm;
    this._submitBtnText = this._submitBtn.textContent;
    this._inputLists = this._form.querySelectorAll(".popup__item");
  }

  renderLoading(isLoading, buttonText = "Сохранение...") {
    if (isLoading) {
      this._submitBtn.textContent = buttonText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputLists.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }


  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
