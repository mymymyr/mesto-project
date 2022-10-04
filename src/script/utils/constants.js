const cardTemplate = '#elements__item-template';
const cardsContainer = '.elements__items';

const configApi = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "eaada802-eae7-468f-b2f3-51d625f02b5e",
    "Content-Type": "application/json"
  }
};

const userInfoSelectors = {
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle',
  avatar: '.profile__avatar',
};

const selectorsPopupWindow = {
  popupSelector: ".popup_position_img",
  popupViewImg: ".popup__image",
  popupViewText: ".popup__text",
};

const popupSelectors = {
  editAvatar: '.popup_position_photo-profile',
  editInfo: ".popup_position_profile",
  newCard: '.popup_position_place',
}

const btnAvatar = document.querySelector(
  ".profile__edit-photo-button"
);
const btnAdd = document.querySelector(".profile__add-button");
const btnEdit = document.querySelector(".profile__edit-button");

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  closeBtnSelector: '.popup__close-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'form__input-error'
};

export { cardTemplate, cardsContainer, userInfoSelectors, selectorsPopupWindow, configApi, popupSelectors, btnAvatar, btnAdd, btnEdit, object };
