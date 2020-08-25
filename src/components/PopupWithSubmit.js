import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submit = this._popup.querySelector('.popup__submit');
    }

    setFormSubmitHandler(handler) {
        this.setFormSubmitHandler = handler;
    }

    close() {
        super.close();
        this._form.reset();
        this._submit.value = "Сохранить";
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit.value = "Сохранение...";
            if (this.setFormSubmitHandler) {
                this.setFormSubmitHandler();
            }
        });
    }
}