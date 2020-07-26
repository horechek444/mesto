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

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorShowClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);
    
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorShowClass);
        errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid; 
        });
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) { 
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true); 
        } else { 
            buttonElement.classList.remove(this._inactiveButtonClass); 
            buttonElement.removeAttribute('disabled'); 
        }
    }

    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement)); 
        const buttonElement = formElement.querySelector(this._buttonElement);
        
        inputList.forEach((inputElement) => { 
            inputElement.addEventListener('input', () => { 
                this._checkInputValidity(inputElement); 
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    updateErrorsAndButtonState = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
        const buttonElement = formElement.querySelector(this._buttonElement); 
        
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState(inputList, buttonElement);
    };

    enableValidation() {
        const formElement = document.querySelector(this._formSelector);
        
        this.updateErrorsAndButtonState(formElement); 
        this._setEventListeners(formElement); 

        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });    
    }
}

// class editFormValidator extends FormValidator {
//     constructor(validationParams) {
//         super(validationParams)
//     }
// }

// class addFormValidator extends FormValidator {
//     constructor(validationParams) {
//         super(validationParams)
//     }
// }