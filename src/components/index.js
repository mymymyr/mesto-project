import "../styles/index.css";
import Api from "./api.js";
import Section from "./Section";
import Card from "./Card";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
// import { object } from "./data.js";
import { handleOpenPopup, handleOpenPopupEdit } from "./utils";
// import { enableValidation } from "./validate.js";
import UserInfo from "./UserInfo";
import FormValidator from "./FormValidator.js";
import {
  userInfoSelectors,
  cardTemplate,
  cardsContainer,
  selectorsPopupWindow,
  configApi,
  popupSelectors,
  cardSelectors,
  btnAdd,
  btnAvatar,
  btnEdit,
  object
} from "./constants.js";

// let userId = "";

// экземпляр апи
export const api = new Api(configApi);

// получение данных с сервера
Promise.all([api.fetchUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    placesSection.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

// экземпляр пользователя
const userInfo = new UserInfo(userInfoSelectors);

// экземпляр секции с карточками
const placesSection = new Section(
  {
    renderer: (item) => {
      const place = new Card(
        item,
        userInfo.getUserId(),
        cardTemplate,
        handleImageClick,
        toggleLike,
        handleDelete
      );
      const placeElement = place.generate();
      placesSection.addItem(placeElement);
    },
  },
  cardsContainer
);

//рендер новой карточки
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    userInfo.getUserId(),
    cardSelectors,
    handleImageClick,
    toggleLike,
    handleDelete
  );
  return card.generate();
};

// обработчик сабмита аватара
const handleSubmitPopupAvatar = async ( avatar ) => {
  popupAvatar.renderLoading(true);
  try {
    const data  = await api.setUserAvatar(avatar.heading);
    userInfo.setUserInfo(data);
    popupAvatar.close();
  } catch (err) {
    console.log(`Ошибка ${err}`);
  } finally {
    popupAvatar.renderLoading(false);
  }
};

// обработчик сабмита данных профиля
const handleSubmitPopupEdit =  (inputValues) => {
  popupEdit.renderLoading(true);
  api.setUserInfo(inputValues['name'], inputValues['about'])
  .then(userData => {
    userInfo.setUserInfo(userData);
    popupEdit.close();
  })
  .catch ((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    popupEdit.renderLoading(false);
  })
};

// обработчик сабмита новой карточки
const handleSubmitPopupCard =  (inputValues) => {
  popupCard.renderLoading(true);
  api.addNewCard(inputValues['name'], inputValues['link'])
  .then(cardData => {
    placesSection.addItem(renderCard(cardData), true);
    popupCard.close();
  })
  .catch ((err) => {
    console.log(`Ошибка ${err}`);
  })
  .finally(() => {
    popupCard.renderLoading(false);
  })
};

// ДЛЯ СЛУШАТЕЛЕЙ ВНУТРИ КАРТОЧКИ

//открытие попапа с картинкой
const handleImageClick = (name, link) => {
  popupWindow.open(name, link);
};

// обработка лайка
const toggleLike = async (card) => {
  try {
    const data = card.checkLike()
      ? await api.unsetLike(card._id)
      : await api.setLike(card._id);
    card.likes = data.likes;
    card.renderLike();
  } catch (err) {
    console.log(err);
  }
};

// удаление карточки
const handleDelete = async (card) => {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => console.log(err));
};

// экземпляры попапов
const popupWindow = new PopupWithImage(selectorsPopupWindow);
const popupEdit = new PopupWithForm(popupSelectors.editInfo, handleSubmitPopupEdit);
const popupAvatar = new PopupWithForm(popupSelectors.editAvatar, handleSubmitPopupAvatar);
const popupCard = new PopupWithForm(popupSelectors.newCard, handleSubmitPopupCard);

// слушатели для модальных окон
popupWindow.setEventListeners();
popupAvatar.setEventListeners();
popupCard.setEventListeners();
popupEdit.setEventListeners();

// обработчики открытия форм
btnAvatar.addEventListener("click", () => handleOpenPopup(popupAvatar));
btnEdit.addEventListener("click", () => handleOpenPopupEdit(popupEdit, validPopupEdit));
btnAdd.addEventListener("click", () => handleOpenPopup(popupCard));

// валидация форм
const validPopupEdit = new FormValidator(object, popupEdit.getPopup());
validPopupEdit.enableValidation(object);
popupEdit.setClearValidationCallback(validPopupEdit.clearValidationState.bind(validPopupEdit));
const validPopupAvatar = new FormValidator(object, popupAvatar.getPopup());
validPopupAvatar.enableValidation(object);
const validPopupCard = new FormValidator(object, popupCard.getPopup());
validPopupCard.enableValidation(object);