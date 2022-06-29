const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelectorAll('.popup__item')[0];
const jobInput = formElement.querySelectorAll('.popup__item')[1];
const cardTemplate = document.querySelector('#elements__item-template').content;
const cards = document.querySelector('.elements__items');


initialCards.forEach((item) => {
  let card = cardTemplate.querySelector('.elements__item').cloneNode(true);
  card.querySelector('.elements__image').src = item.link;
  card.querySelector('.elements__text').alt = item.name;
  card.querySelector('.elements__text').textContent = item.name;
  cards.append(card);
});


editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
