import '../styles/index.css';
import {
  initialCards, object
} from './data.js';
import { createCard, addDeleteCard } from './cards.js';
import { clearValidationState, enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { fetchCards, fetchUserInfo, setUserInfo, addNewCard, setUserAvatar } from './api';

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
const popupPhoto = document.forms.photo;
const popupPhotoInput = popupPhoto.querySelector(cssSelectorPopupHeading);
const btnAdd = document.querySelector('.profile__add-button');
const btnEdit = document.querySelector('.profile__edit-button');
const btnEditPhoto = document.querySelector('.profile__edit-photo-button');
const avatar = document.querySelector('.profile__avatar');

let userId = '';


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

const fillCards = (data) => {
  data.forEach((item) => {
    const card = createCard(item.name, item.link, item._id, item.likes, userId);
    addEventForViewImage(card.querySelector('.elements__image'));
    if (item.owner._id === userId) {
      addDeleteCard(card.querySelector('.elements__trash-button'));
    }
    prependCard(card);
  });
}

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

const addBtnsClickPopupPhoto = (popupPhoto) => {
  btnEditPhoto.addEventListener('click', () => {
    openPopup(popupPhoto);
  });
};

const fillUserInfo = (data) => {
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  avatar.src = data.avatar;
  userId = data._id;
}

const submitHandlerPopupProfileForm = (evt, popup) => {
  evt.preventDefault();
  const buttonForm = popup.querySelector('.button-form');
  const prevValue = buttonForm.textContent;
  buttonForm.textContent = 'Сохранение...';
  setUserInfo(popupProfileHeadingInput.value, popupProfileSubheadingInput.value).then((res) => {
    fillUserInfo(res);
    closePopup(popup);
    buttonForm.textContent = prevValue;
  }).catch(() => {
    buttonForm.textContent = prevValue;
  })
};

const submitHandlerPopupPlaceForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const buttonForm = popup.querySelector('.button-form');
  const prevValue = buttonForm.textContent;
  buttonForm.textContent = 'Сохранение...';

  addNewCard(popupPlaceHeadingInput.value, popupPlaceSubheadingInput.value).then((res) => {
    const card = createCard(res.name, res.link, res._id, res.likes, userId);
    addDeleteCard(card.querySelector('.elements__trash-button'));
    addEventForViewImage(card.querySelector('.elements__image'));
    prependCard(card);
    closePopup(popup);
    popupForm.reset();
    buttonForm.textContent = prevValue;
  }).catch(() => {
    buttonForm.textContent = prevValue;
  });
};

const submitHandlerPopupPhotoForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const buttonForm = popup.querySelector('.button-form');
  const prevValue = buttonForm.textContent;
  buttonForm.textContent = 'Сохранение...';

  setUserAvatar(popupPhotoInput.value).then((res) => {
    avatar.src = res.avatar;
    closePopup(popup);
    popupForm.reset();
    buttonForm.textContent = prevValue;
  }).catch(() => {
    buttonForm.textContent = prevValue;
  });

};

const enableListeners = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    const popup = formElement.parentElement.parentElement;
    const popupButtonClose = popup.querySelector(object.closeBtnSelector);
    if (formElement === popupProfile) {
      formElement.addEventListener('submit', (evt) => submitHandlerPopupProfileForm(evt, popup));
      setValueFormProfileInputs();
      addBtnsClickPopupProfile(popup);
    } else if (formElement === popupPlace) {
      formElement.addEventListener('submit', (evt) => submitHandlerPopupPlaceForm(evt, formElement, popup));
      addBtnsClickPopupPlace(popup);
    } else if (formElement === popupPhoto) {
      formElement.addEventListener('submit', (evt) => submitHandlerPopupPhotoForm(evt, formElement, popup));
      addBtnsClickPopupPhoto(popup);
    }
    addEventClosePopup(popupButtonClose, popup);
  });
};

enableListeners(object);
enableValidation(object);



function fillData() {
  fetchUserInfo().then((res) => fillUserInfo(res))
    .then(() => {
      console.log(userId);
      fetchCards().then((res) => fillCards(res))
    });

}

fillData();



