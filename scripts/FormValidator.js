const validationParams = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__submit',    
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
    controlSelectorClass: '.popup__control',
    errorClass: '.popup__error'
};

class FormValidator {
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
    }

    _checkInputValidity() {
        if(!this._inputElement.validity.valid) {
            this._inputElement._showInputError();
        } else {
            this._inputElement._hideInputError();
        }
    }

    _hasInvalidInput() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid; 
        });
    }

    enableValidation() {
        this._formElement.addEventListener('keyup', event => console.log(event));
    }
}

const valid = new FormValidator(validationParams, '.form_type_add');
console.log(valid);
