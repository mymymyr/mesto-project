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

const setEventListenersForCard = (card) => {
  toggleLike(card.querySelector('.elements__like-button'));
  deleteCard(card.querySelector('.elements__trash-button'));
};

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#elements__item-template');
  const card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  card.querySelector('.elements__text').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  setEventListenersForCard(card);
  return card;
};

export { createCard, toggleLike, deleteCard };
