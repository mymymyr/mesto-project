const cssSelectorPopupHeading = '.popup__item[name="heading"]';
const cssSelectorPopupSubheading = '.popup__item[name="subheading"]';
const body = document.querySelector('.page');
const cardTemplate = body.querySelector('#elements__item-template');
const cardContainer = body.querySelector('.elements__items');

initialCards.forEach((item) => {
  const card = renderCard(item.name, item.link);
  cardContainer.prepend(card);
});

const btnEdit = body.querySelector('.profile__edit-button');
const btnAdd = body.querySelector('.profile__add-button');
const profileTitle = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');

const popupProfile = body.querySelector('.popup_position_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const btnClosePopupProfile = popupProfile.querySelector('.popup__close-button');
addEventClosePopup(btnClosePopupProfile, popupProfile);
popupProfileForm.addEventListener('submit', submitHandlerPopupProfileForm);

const popupPlace = body.querySelector('.popup_position_place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const inputHeadingPopupPlace = popupPlace.querySelector(cssSelectorPopupHeading);
const inputSubheadingPopupPlace = popupPlace.querySelector(cssSelectorPopupSubheading);
const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button');
addEventClosePopup(btnClosePopupPlace, popupPlace);
popupPlaceForm.addEventListener('submit', submitHandlerPopupPlaceForm);


const popupView = body.querySelector('.popup_position_img');
const popupViewImg = popupView.querySelector('.popup__image');
const popupViewText = popupView.querySelector('.popup__text');
const btnClosePopupView = popupView.querySelector('.popup__close-button');
addEventClosePopup(btnClosePopupView, popupView);

btnEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfile.querySelector(cssSelectorPopupHeading).value = profileTitle.textContent;
  popupProfile.querySelector(cssSelectorPopupSubheading).value = profileSubtitle.textContent;
});

btnAdd.addEventListener('click', () => {
  openPopup(popupPlace);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitHandlerPopupProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfile.querySelector(cssSelectorPopupHeading).value;
  profileSubtitle.textContent = popupProfile.querySelector(cssSelectorPopupSubheading).value;
  closePopup(popupProfile);
}

function submitHandlerPopupPlaceForm(evt) {
  evt.preventDefault();
  const card = renderCard(inputHeadingPopupPlace.value, inputSubheadingPopupPlace.value);
  cardContainer.prepend(card);
  closePopup(popupPlace);
  popupPlaceForm.reset();
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
