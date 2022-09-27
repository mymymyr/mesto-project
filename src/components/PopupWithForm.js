import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmitPopupPlaceForm){
    super(popup)
    this._form = this._popup.querySelector(formPlace);
    this._inputList = this._form.querySelectorAll('.popup__item');
    this._submitBtn = this._form.querySelectorAll('.popup__save-button');
    this._handleSubmitPopupPlaceForm = handleSubmitPopupPlaceForm;
}
// не закончено
}
