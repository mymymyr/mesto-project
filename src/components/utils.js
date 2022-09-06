import { createCard, toggleLike, deleteCard } from './cards.js';
import { addEventForViewImage } from './modal.js';
import { closePopup } from './modal.js';

const renderCard = (popupView, name, link) => {
    const card = createCard(name, link);
    toggleLike(card.querySelector('.elements__like-button'));
    deleteCard(card.querySelector('.elements__trash-button'));
    addEventForViewImage(popupView, card.querySelector('.elements__image'), name);
    return card;
};

const addEventClosePopup = (btnClose, popup) => {
    btnClose.addEventListener('click', () => {
        closePopup(popup);
    });
};

export { renderCard, addEventClosePopup }