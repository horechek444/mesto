export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

export function closePopupByOverlay(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.target === event.currentTarget) { 
        closePopup(currentPopup); 
    }
}

export function closePopupByEsc(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.key === 'Escape') { 
        closePopup(currentPopup);
    }
}

export function showPopupPicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__image');

    picturePopupImage.src = picturesElement.src;
    picturePopupCaption.textContent = picturesElement.alt;
    openPopup(picturePopup); 
}