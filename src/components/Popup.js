export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (event) => this._handleEscClose(event));
    }

    _handleEscClose(event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if(event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (event) => this._handleOverlayClose(event));
    }
}