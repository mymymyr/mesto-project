const body = document.querySelector('.page');
const cardTemplate = body.querySelector('.elements__item-template');
const cards = body.querySelector('.elements__items');

initialCards.forEach((item) => {
  let card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  card.querySelector('.elements__image').src = item.link;
  card.querySelector('.elements__text').alt = item.name;
  card.querySelector('.elements__text').textContent = item.name;
  cards.append(card);
});

const editButton = body.querySelector('.profile__edit-button');
const profileTitle = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');
const popupTemplate = body.querySelector('.popup-template');
const editPopup = popupTemplate.content.querySelector('.popup').cloneNode(true);
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const editPopupFormElement = editPopup.querySelector('.popup__form');
const editPopupNameInput = editPopupFormElement.querySelector('.popup__item[name="heading"]');
const editPopupJobInput = editPopupFormElement.querySelector('.popup__item[name="subheading"]');
editPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
editPopupNameInput.placeholder = 'Жак-Ив Кусто';
editPopupJobInput.placeholder = 'Исследователь океана';
body.append(editPopup);

editButton.addEventListener('click', () => {
  editPopup.classList.add('popup_opened');
  editPopupNameInput.value = profileTitle.textContent;
  editPopupJobInput.value = profileSubtitle.textContent;
});

editPopupCloseButton.addEventListener('click', () => {
  editPopup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = editPopupNameInput.value;
  profileSubtitle.textContent = editPopupJobInput.value;
  editPopup.classList.remove('popup_opened');
}

editPopupFormElement.addEventListener('submit', formSubmitHandler);

const addButton = body.querySelector('.profile__add-button');
const newPlacePopup = popupTemplate.content.querySelector('.popup').cloneNode(true);
const newPlacePopupCloseButton = newPlacePopup.querySelector('.popup__close-button');
const newPlacePopupFormElement = newPlacePopup.querySelector('.popup__form');
const newPlacePopupNameInput = newPlacePopupFormElement.querySelector('.popup__item[name="heading"]');
const newPlacePopupLinkInput = newPlacePopupFormElement.querySelector('.popup__item[name="subheading"]');
newPlacePopup.querySelector('.popup__title').textContent = 'Новое место';
newPlacePopup.querySelector('.popup__save-button').textContent = 'Создать';
newPlacePopupNameInput.placeholder = 'Название';
newPlacePopupLinkInput.placeholder = 'Ссылка на картинку';
body.append(newPlacePopup);

addButton.addEventListener('click', () => {
  newPlacePopup.classList.add('popup_opened');
  newPlacePopupLinkInput.value = '';
  newPlacePopupNameInput.value = '';
});

newPlacePopupCloseButton.addEventListener('click', () => {
  newPlacePopup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  let card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  card.querySelector('.elements__image').src = newPlacePopupLinkInput.value;
  card.querySelector('.elements__text').alt = newPlacePopupNameInput.value;
  card.querySelector('.elements__text').textContent = newPlacePopupNameInput.value;
  cards.append(card);
  newPlacePopup.classList.remove('popup_opened');
}

newPlacePopupFormElement.addEventListener('submit', formSubmitHandler);
