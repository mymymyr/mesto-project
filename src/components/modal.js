const popupList = Array.from(document.querySelectorAll('.popup'));

function clickOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};

function handleEscapeKey(evt) {
    if (evt.key !== 'Escape')
        return;
    popupList.forEach((popup) => {
        if (popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', clickOverlay);
    document.addEventListener('keyup', handleEscapeKey);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', clickOverlay);
    document.removeEventListener('keyup', handleEscapeKey);
};

export { openPopup, closePopup };

