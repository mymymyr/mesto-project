import '../styles/index.css';
import {
  initialCards, object
} from './data.js';
import { createCard } from './cards.js';
import { clearValidationState, enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';

const cssSelectorPopupHeading = '.popup__item[id="heading"]';
const cssSelectorPopupSubheading = '.popup__item[id="subheading"]';
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements__items');
const popupView = document.querySelector('.popup_position_img');
const popupViewImg = popupView.querySelector('.popup__image');
const popupViewText = popupView.querySelector('.popup__text');
const btnClosePopupView = popupView.querySelector('.popup__close-button');
const popupProfile = document.forms.profile;
const popupProfileHeadingInput = popupProfile.querySelector(cssSelectorPopupHeading);
const popupProfileSubheadingInput = popupProfile.querySelector(cssSelectorPopupSubheading);
const popupPlace = document.forms.place;
const popupPlaceHeadingInput = popupPlace.querySelector(cssSelectorPopupHeading);
const popupPlaceSubheadingInput = popupPlace.querySelector(cssSelectorPopupSubheading);
const btnAdd = document.querySelector('.profile__add-button');
const btnEdit = document.querySelector('.profile__edit-button');

const addEventClosePopup = (btnClose, popup) => {
  btnClose.addEventListener('click', () => {
    closePopup(popup);
  });
};

addEventClosePopup(btnClosePopupView, popupView);

const prependCard = (card) => {
  cardsContainer.prepend(card);
};

const viewImage = (img, name) => {
  popupViewImg.src = img.src;
  popupViewImg.alt = img.alt;
  popupViewText.textContent = name;
};

const addEventForViewImage = (img, name) => {
  img.addEventListener('click', () => {
    openPopup(popupView);
    viewImage(img, name);
  });
};

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  addEventForViewImage(card.querySelector('.elements__image'));
  prependCard(card);
});

const setValueFormProfileInputs = () => {
  popupProfileHeadingInput.value = profileTitle.textContent;
  popupProfileSubheadingInput.value = profileSubtitle.textContent;
};

const addBtnsClickPopupProfile = (popupProfile) => {
  btnEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    setValueFormProfileInputs();
    clearValidationState(popupProfile, object);
  });
};

const addBtnsClickPopupPlace = (popupPlace) => {
  btnAdd.addEventListener('click', () => {
    openPopup(popupPlace);
  });
};

const submitHandlerPopupProfileForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileHeadingInput.value;
  profileSubtitle.textContent = popupProfileSubheadingInput.value;
  closePopup(popup);
};

const submitHandlerPopupPlaceForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const card = createCard(popupPlaceHeadingInput.value, popupPlaceSubheadingInput.value);
  addEventForViewImage(card.querySelector('.elements__image'));
  prependCard(card);
  closePopup(popup);
  popupForm.reset();
};

const enableListeners = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    const popup = formElement.parentElement.parentElement;
    const popupButtonClose = popup.querySelector(object.closeBtnSelector);
    if (formElement === popupProfile) {
      formElement.addEventListener('submit', (evt) => submitHandlerPopupProfileForm(evt, formElement, popup));
      setValueFormProfileInputs();
      addBtnsClickPopupProfile(popup);
    } else if (formElement === popupPlace) {
      formElement.addEventListener('submit', (evt) => submitHandlerPopupPlaceForm(evt, formElement, popup));
      addBtnsClickPopupPlace(popup);
    }
    addEventClosePopup(popupButtonClose, popup);
  });
};

enableListeners(object);
enableValidation(object);








