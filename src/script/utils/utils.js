const handleOpenPopup = (popup, validator) => {
  popup.open();
  validator.clearValidationState();
};

const handleOpenPopupEdit = (popup, info, validator) => {
  popup.open();
  popup.setInputValues(info);
  validator.clearValidationState();
};

export { handleOpenPopup, handleOpenPopupEdit }
