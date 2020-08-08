import Popup from './Popup.js';

export default class PopupWIthForm extends Popup {
    constructor(popupSelector, submitFormCallback){
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        event.preventDefault();
        let values = [];
        const InputList = Array.from(this._form.querySelector('.popup__input'));
        InputList.forEach((Input) => {
            values += Input.value;
        })
    }

    close() {
        super.close();
        
    }
}