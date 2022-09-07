function clickOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

function addEventKeyUpEscape(evt) {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popup) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', clickOverlay);
    document.addEventListener('keyup', addEventKeyUpEscape);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', clickOverlay);
    document.removeEventListener('keyup', addEventKeyUpEscape);
};

export { openPopup, closePopup };

