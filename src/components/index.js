import '../styles/index.css';
import {
  initialCards
} from './cards.js';

const cssSelectorPopupHeading = '.popup__item[id="heading"]';
const cssSelectorPopupSubheading = '.popup__item[id="subheading"]';
const body = document.querySelector('.page');
const cardTemplate = body.querySelector('#elements__item-template');
const cardContainer = body.querySelector('.elements__items');

initialCards.forEach((item) => {
  const card = renderCard(item.name, item.link);
  cardContainer.prepend(card);
});

// const btnEdit = body.querySelector('.profile__edit-button');
// const btnAdd = body.querySelector('.profile__add-button');
const profileTitle = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');

// const popupProfile = body.querySelector('.popup_position_profile'); //исправить на document.forms...
// const popupProfileForm = popupProfile.querySelector('.popup__form');
// const btnClosePopupProfile = popupProfile.querySelector('.popup__close-button');
// addEventClosePopup(btnClosePopupProfile, popupProfile);
// popupProfileForm.addEventListener('submit', submitHandlerPopupProfileForm);

// const popupPlace = body.querySelector('.popup_position_place'); //исправить на document.forms...
// const popupPlaceForm = popupPlace.querySelector('.popup__form');
// const inputHeadingPopupPlace = popupPlace.querySelector(cssSelectorPopupHeading);
// const inputSubheadingPopupPlace = popupPlace.querySelector(cssSelectorPopupSubheading);
// const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button');
// addEventClosePopup(btnClosePopupPlace, popupPlace);
// popupPlaceForm.addEventListener('submit', submitHandlerPopupPlaceForm);


const popupView = body.querySelector('.popup_position_img');
const popupViewImg = popupView.querySelector('.popup__image');
const popupViewText = popupView.querySelector('.popup__text');
const btnClosePopupView = popupView.querySelector('.popup__close-button');
addEventClosePopup(btnClosePopupView, popupView);

// btnEdit.addEventListener('click', () => {
//   openPopup(popupProfile);
//   popupProfile.querySelector(cssSelectorPopupHeading).value = profileTitle.textContent;
//   popupProfile.querySelector(cssSelectorPopupSubheading).value = profileSubtitle.textContent;
// });

// btnAdd.addEventListener('click', () => {
//   openPopup(popupPlace);
// });

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOverlay)
  document.addEventListener('keyup', (evt) => addEventKeyUpEscape(evt, popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', clickOverlay)
  document.removeEventListener('keyup', addEventKeyUpEscape);
}

function submitHandlerPopupProfileForm(evt, popupForm, popup) {
  evt.preventDefault();
  profileTitle.textContent = popupForm.querySelector(cssSelectorPopupHeading).value;
  profileSubtitle.textContent = popupForm.querySelector(cssSelectorPopupSubheading).value;
  closePopup(popup);
}

function submitHandlerPopupPlaceForm(evt, popupForm, popup) {
  evt.preventDefault();
  const card = renderCard(popupForm.querySelector(cssSelectorPopupHeading).value, popupForm.querySelector(cssSelectorPopupSubheading).value);
  cardContainer.prepend(card);
  closePopup(popup);
  popup.reset();
}

function toggleLike(btnLike) {
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('elements__like-button_active');
  });
}

function deleteCard(btnTrash) {
  btnTrash.addEventListener('click', () => {
    btnTrash.parentElement.remove();
  });
}

function viewImage(img, name) {
  img.addEventListener('click', () => {
    openPopup(popupView);
    popupViewImg.src = img.src;
    popupViewImg.alt = img.alt;
    popupViewText.textContent = name;
  });
}

function addEventClosePopup(btnClose, popup) {
  btnClose.addEventListener('click', () => {
    closePopup(popup);
  });
}

function renderCard(name, link) {
  const card = createCard(name, link);
  toggleLike(card.querySelector('.elements__like-button'));
  deleteCard(card.querySelector('.elements__trash-button'));
  viewImage(card.querySelector('.elements__image'), name);
  return card;
}

function createCard(name, link) {
  const card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  card.querySelector('.elements__text').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  return card;
}

function clickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function addEventKeyUpEscape(evt, popup) {
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
  }
}


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__input-error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  const invalidInput = hasInvalidInput(inputList);
  if (invalidInput) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
  buttonElement.disabled = invalidInput;
};

const setValidationEventListeners = (inputList, buttonElement, formElement) => {
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

const addSubmitEvent = (popupForm, popup) => {
  if (popupForm === document.forms.profile) {
    popupForm.addEventListener('submit', (evt) => submitHandlerPopupProfileForm(evt, popupForm, popup));
  } else if (popupForm === document.forms.place) {
    popupForm.addEventListener('submit', (evt) => submitHandlerPopupPlaceForm(evt, popupForm, popup));
  }
};

const addBtnsClickEvent = (popupForm, popup) => {
  const btnAdd = body.querySelector('.profile__add-button');
  const btnEdit = body.querySelector('.profile__edit-button');
  if (popupForm === document.forms.profile) {
    btnEdit.addEventListener('click', () => {
      openPopup(popup);
      popup.querySelector(cssSelectorPopupHeading).value = profileTitle.textContent;
      popup.querySelector(cssSelectorPopupSubheading).value = profileSubtitle.textContent;
    });
  } else if (popupForm === document.forms.place) {
    btnAdd.addEventListener('click', () => {
      openPopup(popup);
    });
  }
};

const setEventListeners = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    const popup = formElement.parentElement.parentElement;
    const popupButtonClose = popup.querySelector('.popup__close-button');
    addSubmitEvent(formElement, popup);
    addBtnsClickEvent(formElement, popup);
    addEventClosePopup(popupButtonClose, popup);
    setValidationEventListeners(inputList, buttonElement, formElement);
  });
};

setEventListeners();