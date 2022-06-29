const cssSelectorPopupHeading = '.popup__item[name="heading"]';
const cssSelectorPopupSubheading = '.popup__item[name="subheading"]';
const body = document.querySelector('.page');
const cardTemplate = body.querySelector('.elements__item-template');
const cards = body.querySelector('.elements__items');
const popupView = body.querySelector('.popup-view');
const popupViewImg = popupView.querySelector('.popup-view__image');
const popupViewText = popupView.querySelector('.popup-view__text');
const popupViewCloseButton = popupView.querySelector('.popup__close-button');
closePopup(popupViewCloseButton, popupView);

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

const editButton = body.querySelector('.profile__edit-button');
const addButton = body.querySelector('.profile__add-button');
const profileTitle = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');

const popupTemplate = body.querySelector('.popup-template');

const editPopup = createPopup('Редактировать профиль', 'Жак-Ив Кусто', 'Исследователь океана', 'Сохранить');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
closePopup(editPopupCloseButton, editPopup);
editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);

const placePopup = createPopup('Новое место', 'Название', 'Ссылка на картинку', 'Создать');
const placePopupForm = placePopup.querySelector('.popup__form');
const placePopupInputHeading = placePopup.querySelector(cssSelectorPopupHeading);
const placePopupInputSubheading = placePopup.querySelector(cssSelectorPopupSubheading);
const placePopupCloseButton = placePopup.querySelector('.popup__close-button');
closePopup(placePopupCloseButton, placePopup);
placePopupForm.addEventListener('submit', placePopupFormSubmitHandler);

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  editPopup.querySelector(cssSelectorPopupHeading).value = profileTitle.textContent;
  editPopup.querySelector(cssSelectorPopupSubheading).value = profileSubtitle.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(placePopup);
  placePopup.querySelector(cssSelectorPopupHeading).value = '';
  placePopup.querySelector(cssSelectorPopupSubheading).value = '';
});

function createPopup(popupTitle, inputHeading, inputSubheading, buttonTitle) {
  let popup = popupTemplate.content.querySelector('.popup').cloneNode(true);
  popup.querySelector('.popup__title').textContent = popupTitle;
  popup.querySelector('.popup__save-button').textContent = buttonTitle;
  popup.querySelector(cssSelectorPopupHeading).placeholder = inputHeading;
  popup.querySelector(cssSelectorPopupSubheading).placeholder = inputSubheading;
  body.append(popup);
  return popup;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function editPopupFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = editPopup.querySelector(cssSelectorPopupHeading).value;
  profileSubtitle.textContent = editPopup.querySelector(cssSelectorPopupSubheading).value;
  editPopup.classList.remove('popup_opened');
}

function placePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(placePopupInputHeading.value, placePopupInputSubheading.value);
  placePopup.classList.remove('popup_opened');
}

function addCard(name, link) {
  let card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  let cardImage = card.querySelector('.elements__image');
  card.querySelector('.elements__text').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cards.prepend(card);
  toggleLike(card.querySelector('.elements__like-button'));
  deleteCard(card.querySelector('.elements__trash-button'));
  viewImage(cardImage, name);
}

function toggleLike(likeButton) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__like-button_active');
  });
}

function deleteCard(trashButton) {
  trashButton.addEventListener('click', () => {
    trashButton.parentElement.remove();
  });
}

function viewImage(img, name) {
  img.addEventListener('click', () => {
    popupView.classList.add('popup_opened');
    popupViewImg.src = img.src;
    popupViewImg.alt = img.alt;
    popupViewText.textContent = name;
  });
}

function closePopup(closeButton, popup) {
  closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  });
}
