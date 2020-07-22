export default class FormValidator {
    constructor(validationParams, formSelector) {
        this._formElement = validationParams.formElement;
        this._inputElement = validationParams.inputElement;
        this._buttonElement = validationParams.buttonElement;    
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorShowClass = validationParams.errorShowClass;
        this._controlSelectorClass = validationParams.controlSelectorClass;
        this._errorClass = validationParams.errorClass;

        this._formSelector = formSelector;
    }

    _showInputError() {
        const errorElement = this._inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);

        this._inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorShowClass);
    }

    _hideInputError() {
        const errorElement = this._inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);
    
        this._inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorShowClass);
        errorElement.textContent = '';
    };

    _checkInputValidity() {
        if(!this._inputElement.validity.valid) {
            this._inputElement._showInputError();
        } else {
            this._inputElement._hideInputError();
        }
    };

    enableValidation() {

    }
}