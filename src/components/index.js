import "../styles/index.css";
import Api from "./api.js";
import Section from "./Section";
import Card from "./Card";
import Popup from "./Popup";
import PopupWithImage from "./PopupWithImage";
import { object } from "./data.js";
import { appendCard, prependCard, createCard } from "./cards.js";
import { clearValidationState, enableValidation } from "./validate.js";
// import { openPopup, closePopup } from "./modal.js";
import UserInfo from "./UserInfo";
import {
  userInfoSelectors,
  cardTemplate,
  cardsContainer,
  selectorsPopupView,
  configApi
} from "./constants.js";

// экземпляр апи
export const api = new Api(configApi);

// экземпляр пользователя
const userInfo = new UserInfo(userInfoSelectors);

// экземпляр секции с карточками
const placesSection = new Section(
  {
    renderer: (item) => {
      const place = new Card(item, userInfo.getUserInfo().userId, cardTemplate, handleImageClick, toggleLike, handleDelete);
      const placeElement = place.generate();
      placesSection.addItem(placeElement);
    },
  },
  cardsContainer
);

// экземпляр попапов
const popupWindow = new PopupWithImage(selectorsPopupView);
// попапы с формами (аватар, инфор пользователя, добавление карточки) - пока пусто


// получение данных с сервера
Promise.all([api.fetchUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    placesSection.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

const cssSelectorPopupHeading = '.popup__item[id="heading"]';
const cssSelectorPopupSubheading = '.popup__item[id="subheading"]';
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
// const cardsContainer = document.querySelector(".elements__items");
// const popupView = document.querySelector(".popup_position_img");
// const popupViewImg = popupView.querySelector(".popup__image");
// const popupViewText = popupView.querySelector(".popup__text");
const formProfile = document.forms.profile;
const popupProfile = formProfile.closest(".popup");
const popupProfileHeadingInput = formProfile.querySelector(
  cssSelectorPopupHeading
);
const popupProfileSubheadingInput = formProfile.querySelector(
  cssSelectorPopupSubheading
);
const formPlace = document.forms.place;
const popupPlace = formPlace.closest(".popup");
const popupPlaceHeadingInput = formPlace.querySelector(cssSelectorPopupHeading);
const popupPlaceSubheadingInput = formPlace.querySelector(
  cssSelectorPopupSubheading
);
const formPhoto = document.forms.photo;
const popupPhoto = formPhoto.closest(".popup");
const popupPhotoInput = formPhoto.querySelector(cssSelectorPopupHeading);
const btnAdd = document.querySelector(".profile__add-button");
const btnEdit = document.querySelector(".profile__edit-button");
const btnEditPhoto = document.querySelector(".profile__edit-photo-button");
// const avatar = document.querySelector(".profile__avatar");
const closeButtons = document.querySelectorAll(object.closeBtnSelector);

let userId = "";

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

const setValueFormProfileInputs = () => {
  popupProfileHeadingInput.value = profileTitle.textContent;
  popupProfileSubheadingInput.value = profileSubtitle.textContent;
};

const addBtnsClickPopupProfile = (popupProfile) => {
  btnEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    setValueFormProfileInputs();
    clearValidationState(formProfile, object);
  });
};

const addBtnsClickPopupPlace = (popupPlace) => {
  btnAdd.addEventListener("click", () => {
    openPopup(popupPlace);
  });
};

const addBtnsClickPopupPhoto = (popupPhoto) => {
  btnEditPhoto.addEventListener("click", () => {
    openPopup(popupPhoto);
  });
};

const handleSubmitPopupProfileForm = (evt, popup) => {
  evt.preventDefault();
  const prevValue = evt.submitter.textContent;
  evt.submitter.textContent = "Сохранение...";
  api
    .setUserInfo(
      popupProfileHeadingInput.value,
      popupProfileSubheadingInput.value
    )
    .then((res) => {
      userInfo.setUserInfo(res);
      closePopup(popup);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = prevValue;
    });
};

const handleSubmitPopupPlaceForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const prevValue = evt.submitter.textContent;
  evt.submitter.textContent = "Сохранение...";
  api
    .addNewCard(popupPlaceHeadingInput.value, popupPlaceSubheadingInput.value)
    .then((res) => {
      const card = createCard(
        popupView,
        popupViewImg,
        popupViewText,
        res,
        userId
      );
      prependCard(cardsContainer, card);
      closePopup(popup);
      popupForm.reset();
      clearValidationState(popup, object);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = prevValue;
    });
};

const handleSubmitPopupPhotoForm = (evt, popupForm, popup) => {
  evt.preventDefault();
  const prevValue = evt.submitter.textContent;
  evt.submitter.textContent = "Сохранение...";
  api
    .setUserAvatar(popupPhotoInput.value)
    .then((res) => {
      avatar.src = res.avatar;
      closePopup(popup);
      popupForm.reset();
      clearValidationState(popup, object);
    })
    .catch(() => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = prevValue;
    });
};

const enableListeners = () => {
  formProfile.addEventListener("submit", (evt) =>
    handleSubmitPopupProfileForm(evt, popupProfile)
  );
  addBtnsClickPopupProfile(popupProfile);
  setValueFormProfileInputs();

  formPlace.addEventListener("submit", (evt) =>
    handleSubmitPopupPlaceForm(evt, formPlace, popupPlace)
  );
  addBtnsClickPopupPlace(popupPlace);

  formPhoto.addEventListener("submit", (evt) =>
    handleSubmitPopupPhotoForm(evt, formPhoto, popupPhoto)
  );
  addBtnsClickPopupPhoto(popupPhoto);
};

// для слушателей внутри карточки
const handleImageClick = (name, link) => {
  popupWindow.open(name, link);
};

const toggleLike = async (card) => {
  try {
    const data = card.checkLike()
    ? await api.unsetLike(card._id)
    : await api.setLike(card._id);
    card.likes = data.likes;
    card.renderLike();
  }
  catch(err) {
    console.log(err)
  }
};

const handleDelete = (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => console.log(err));
};

enableListeners();
enableValidation(object);
