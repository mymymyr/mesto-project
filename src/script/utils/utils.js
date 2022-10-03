import {popupProfileHeadingInput, popupProfileSubheadingInput} from './constants';

const handleOpenPopup = (popup) => {
  popup.open();
};

const setValueFormProfileInputs = (info) => {
  popupProfileHeadingInput.value = info.name;
  popupProfileSubheadingInput.value = info.about;
};

const handleOpenPopupEdit = (popup, validator, info) => {
  popup.open();
  setValueFormProfileInputs(info);
  validator.checkInputValidity();
};


export {handleOpenPopup, handleOpenPopupEdit}
