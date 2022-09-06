import '../styles/index.css';
import {
  initialCards, prependCard
} from './cards.js';
import { clearValidationState, enableValidation } from './validate.js';
import { renderCard, addEventClosePopup } from './utils.js';
import { openPopup, closePopup } from './modal.js';

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  closeBtnSelector: '.popup__close-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'form__input-error'
};
const cssSelectorPopupHeading = '.popup__item[id="heading"]';
const cssSelectorPopupSubheading = '.popup__item[id="subheading"]';
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


const popupView = document.querySelector('.popup_position_img');
const btnClosePopupView = popupView.querySelector('.popup__close-button');

addEventClosePopup(btnClosePopupView, popupView);

initialCards.forEach((item) => {
  const card = renderCard(popupView, item.name, item.link);
  prependCard(card);
});

const setValueFormInputs = (popup) => {
  popup.querySelector(cssSelectorPopupHeading).value = profileTitle.textContent;
  popup.querySelector(cssSelectorPopupSubheading).value = profileSubtitle.textContent;
};

const addBtnsClickEvent = (popupForm, popup) => {
  const btnAdd = document.querySelector('.profile__add-button');
  const btnEdit = document.querySelector('.profile__edit-button');
  if (popupForm === document.forms.profile) {
    btnEdit.addEventListener('click', () => {
      openPopup(popup);
      setValueFormInputs(popup);
      clearValidationState(popup, object);
    });
  } else if (popupForm === document.forms.place) {
    btnAdd.addEventListener('click', () => {
      openPopup(popup);
    });
  }
};

const submitHandlerPopupProfileForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  profileTitle.textContent = popupForm.querySelector(cssSelectorPopupHeading).value;
  profileSubtitle.textContent = popupForm.querySelector(cssSelectorPopupSubheading).value;
  closePopup(popup);
};

const submitHandlerPopupPlaceForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const card = renderCard(popupView, popupForm.querySelector(cssSelectorPopupHeading).value, popupForm.querySelector(cssSelectorPopupSubheading).value);
  prependCard(card);
  closePopup(popup);
  popupForm.reset();
};

const addSubmitEvent = (popupForm, popup) => {
  if (popupForm === document.forms.profile) {
    popupForm.addEventListener('submit', (evt) => submitHandlerPopupProfileForm(evt, popupForm, popup));
  } else if (popupForm === document.forms.place) {
    popupForm.addEventListener('submit', (evt) => submitHandlerPopupPlaceForm(evt, popupForm, popup));
  }
};

const enableListeners = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    const popup = formElement.parentElement.parentElement;
    const popupButtonClose = popup.querySelector(object.closeBtnSelector);
    addSubmitEvent(formElement, popup);
    if (formElement === document.forms.profile) {
      setValueFormInputs(popup);
    }
    addBtnsClickEvent(formElement, popup);
    addEventClosePopup(popupButtonClose, popup);
  });
};

enableListeners(object);
enableValidation(object);








