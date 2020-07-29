export const popupElement = document.querySelector('.popup_type_picture');
export const popupImage = popupElement.querySelector('.popup__image');
export const popupCloseButton = popupElement.querySelector('.popup__close');
export const popupCaption = popupElement.querySelector('.popup__caption');

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscOrOverlay);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscOrOverlay);
}

export function closePopupByEscOrOverlay(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.target === event.currentTarget || currentPopup && event.key === 'Escape') { 
        closePopup(currentPopup); 
    }
}