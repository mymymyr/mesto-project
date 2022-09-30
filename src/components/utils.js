import {profileTitle, profileSubtitle, popupProfileHeadingInput, popupProfileSubheadingInput} from './constants';

const handleOpenPopup = (popup) => {
  popup.open();
};

const setValueFormProfileInputs = () => {
  popupProfileHeadingInput.value = profileTitle.textContent;
  popupProfileSubheadingInput.value = profileSubtitle.textContent;
};

const handleOpenPopupEdit = (popup) => {
  popup.open();
  setValueFormProfileInputs();
};

export {handleOpenPopup, handleOpenPopupEdit, setValueFormProfileInputs}
