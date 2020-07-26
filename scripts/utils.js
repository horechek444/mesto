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
