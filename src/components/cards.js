import { deleteCard, unsetLike, setLike } from "./api";

const setCounterLikesForCard = (card, counter) => {
  const likeCounter = card.querySelector('.elements__like-counter');
  likeCounter.textContent = counter;
}


const toggleLike = (card) => {
  const btnLike = card.querySelector('.elements__like-button');
 
  btnLike.addEventListener('click', () => {
    let promiseObject;
    if(btnLike.classList.contains('elements__like-button_active')) {
      promiseObject = unsetLike(card.id);
    } else {
      promiseObject = setLike(card.id);
    }
    promiseObject.then((res) => {
        setCounterLikesForCard(card, res.likes.length);
    });
    btnLike.classList.toggle('elements__like-button_active');

  });
};

const addDeleteCard = (btnTrash) => {
  btnTrash.style.display = 'block';
  btnTrash.addEventListener('click', () => {
    deleteCard(btnTrash.parentElement.id);
    btnTrash.parentElement.remove();
  });
};

const setEventListenersForCard = (card) => {
  toggleLike(card);
};

const createCard = (name, link, cardId, likes, userId) => {
  const cardTemplate = document.querySelector('#elements__item-template');
  const card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  const btnLike = card.querySelector('.elements__like-button');

  setCounterLikesForCard(card, likes.length);
  likes.forEach((userInfo) => {
    if (userInfo._id === userId) {
      btnLike.classList.add('elements__like-button_active');
    }
  });

  card.querySelector('.elements__text').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  card.id = cardId;
  setEventListenersForCard(card);
  return card;
};

export { createCard, toggleLike, addDeleteCard };
