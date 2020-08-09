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
        const InputList = Array.from(this._form.querySelectorAll('.popup__input'));
        InputList.forEach((Input) => {
            InputObject[Input.name] = Input.value;
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


// const Popup = document.querySelector('.popup_type_add');
// const Form = Popup.querySelector('.popup__form'); 
// const Object = {};
// const List = Array.from(Form.querySelectorAll('.popup__input')); 
// List.forEach((item) => {
//     Object[item.name] = item.value;
// });
// console.log(Object);