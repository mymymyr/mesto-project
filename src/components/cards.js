const sochiImage = new URL('../images/place-sochi.jpg', import.meta.url);
const stPetersburgImage = new URL('../images/place-st-petersburg.jpg', import.meta.url);
const krasnogorskImage = new URL('../images/place-krasnogorsk.jpg', import.meta.url);
const chelyabinskImage = new URL('../images/place-chelyabinsk.jpg', import.meta.url);
const noginskImage = new URL('../images/place-noginsk.jpg', import.meta.url);
const moscowImage = new URL('../images/place-moscow.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Сочи',
    link: sochiImage
  },
  {
    name: 'Санкт-Петербург',
    link: stPetersburgImage
  },
  {
    name: 'Красногорск',
    link: krasnogorskImage
  },
  {
    name: 'Челябинск',
    link: chelyabinskImage
  },
  {
    name: 'Ногинск',
    link: noginskImage
  },
  {
    name: 'Москва',
    link: moscowImage
  }
];

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#elements__item-template');
  const card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  card.querySelector('.elements__text').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  return card;
};

const toggleLike = (btnLike) => {
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('elements__like-button_active');
  });
};

const deleteCard = (btnTrash) => {
  btnTrash.addEventListener('click', () => {
    btnTrash.parentElement.remove();
  });
};

const prependCard = (card) => {
  const cardContainer = document.querySelector('.elements__items');
  cardContainer.prepend(card);
};

export { initialCards, createCard, toggleLike, deleteCard, prependCard };
