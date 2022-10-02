import {profileTitle, profileSubtitle, popupProfileHeadingInput, popupProfileSubheadingInput} from './constants';

const handleOpenPopup = (popup) => {
  popup.open();
};

const setValueFormProfileInputs = () => {
  popupProfileHeadingInput.value = profileTitle.textContent;
  popupProfileSubheadingInput.value = profileSubtitle.textContent;
};

const handleOpenPopupEdit = (popup, validator) => {
  popup.open();
  setValueFormProfileInputs();
  validator.checkInputValidity();
};


export {handleOpenPopup, handleOpenPopupEdit, setValueFormProfileInputs}
