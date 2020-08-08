import Popup from './Popup.js';

export default class PopupWIthForm extends Popup {
    constructor(popupSelector, submitFormCallback){
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        event.preventDefault();
        const InputObject = {};
        const InputList = Array.from(this._form.querySelector('.popup__input'));
        InputList.forEach((Input) => {
            InputObject.name = Input.name;
            InputObject.value = Input.value;
        })
        return InputObject;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitFormCallback);
    }
}