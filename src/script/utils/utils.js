import { popupProfileHeadingInput, popupProfileSubheadingInput } from './constants';

const handleOpenPopup = (popup, validator) => {
  popup.open();
  validator.clearValidationState();
};

const setValueFormProfileInputs = (info) => {
  popupProfileHeadingInput.value = info.name;
  popupProfileSubheadingInput.value = info.about;
};

const handleOpenPopupEdit = (popup, info, validator) => {
  popup.open();
  setValueFormProfileInputs(info);
  validator.clearValidationState();
};


export { handleOpenPopup, handleOpenPopupEdit }
