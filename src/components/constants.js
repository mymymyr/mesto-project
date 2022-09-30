const cardTemplate = '#elements__item-template';
const cardsContainer = '.elements__items';

const configApi = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "eaada802-eae7-468f-b2f3-51d625f02b5e",
    "Content-Type": "application/json"}
  };

const userInfoSelectors = {
    profileTitle: '.profile__title',
    profileSubtitle: '.profile__subtitle',
    avatar: '.profile__avatar',
};

const selectorsPopupView = {
  popupSelector: ".popup_position_img",
  popupViewImg: ".popup__image",
  popupViewText: ".popup__text",
};


export {cardTemplate, cardsContainer, userInfoSelectors, selectorsPopupView, configApi};
