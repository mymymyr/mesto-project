import { deleteCard, unsetLike, setLike } from "./api";
import { openPopup } from "./modal";

const appendCard = (cardsContainer, card) => {
  cardsContainer.append(card);
};

const prependCard = (cardsContainer, card) => {
  cardsContainer.prepend(card);
};

const viewImage = (popupViewImg, popupViewText, img, name) => {
  popupViewImg.src = img.src;
  popupViewImg.alt = img.alt;
  popupViewText.textContent = name;
};

const addEventForViewImage = (popupView, popupViewImg, popupViewText, img, name) => {
  img.addEventListener('click', () => {
    openPopup(popupView);
    viewImage(popupViewImg, popupViewText, img, name);
  });
};

const setCounterLikesForCard = (likeCounter, counter) => {
  likeCounter.textContent = counter;
}

const toggleLike = (card, likeCounter) => {
  const btnLike = card.querySelector('.elements__like-button');

  btnLike.addEventListener('click', () => {
    let promiseObject;
    if (btnLike.classList.contains('elements__like-button_active')) {
      promiseObject = unsetLike(card.id);
    } else {
      promiseObject = setLike(card.id);
    }
    promiseObject.then((res) => {
      setCounterLikesForCard(likeCounter, res.likes.length);
      btnLike.classList.toggle('elements__like-button_active');
    }).catch((err) => console.log(err));
  });
};

const addDeleteCard = (btnTrash) => {
  btnTrash.style.display = 'block';
  btnTrash.addEventListener('click', () => {
    const card = btnTrash.closest('.elements__item');
    deleteCard(card.id).then(() => {
      card.remove();
    }).catch((err) => console.log(err));
  });
};

const setEventListenersForCard = (card, likeCounter) => {
  toggleLike(card, likeCounter);
};

const createCard = (popupView, popupViewImg, popupViewText, item, userId) => {
  const cardTemplate = document.querySelector('#elements__item-template');
  const card = cardTemplate.content.querySelector('.elements__item').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  const btnLike = card.querySelector('.elements__like-button');
  const likeCounter = card.querySelector('.elements__like-counter');
  addEventForViewImage(popupView, popupViewImg, popupViewText, cardImage, item.name);
  setCounterLikesForCard(likeCounter, item.likes.length);
  if (item.owner._id === userId) {
    addDeleteCard(card.querySelector('.elements__trash-button'));
  }
  item.likes.forEach((userInfo) => {
    if (userInfo._id === userId) {
      btnLike.classList.add('elements__like-button_active');
    }
  });

  card.querySelector('.elements__text').textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  card.id = item._id;
  setEventListenersForCard(card, likeCounter);
  return card;
};

export { appendCard, prependCard, addEventForViewImage, createCard, toggleLike };
