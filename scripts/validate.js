const showInputError = (inputElement, errorMessage, validationParams) => {
    const errorElement = inputElement.closest(validationParams.controlSelectorClass).querySelector(validationParams.errorClass);
    inputElement.classList.add(validationParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationParams.errorShowClass);
};

const hideInputError = (inputElement, validationParams) => {
    const errorElement = inputElement.closest(validationParams.controlSelectorClass).querySelector(validationParams.errorClass);

    inputElement.classList.remove(validationParams.inputErrorClass);
    errorElement.classList.remove(validationParams.errorShowClass);
    errorElement.textContent = '';
};

const checkInputValidity = (inputElement, validationParams) => {
    if(!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, validationParams);
    } else {
        hideInputError(inputElement, validationParams);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid; 
    });
};

const toggleButtonState = (inputList, buttonElement, validationParams) => {
    if (hasInvalidInput(inputList)) { 
        buttonElement.classList.add(validationParams.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled'); 
    } else { 
        buttonElement.classList.remove(validationParams.inactiveButtonClass); 
        buttonElement.removeAttribute('disabled'); 
    }
};

const setEventListeners = (formElement, validationParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputElement)); 
    const buttonElement = formElement.querySelector(validationParams.buttonElement);
    
    inputList.forEach((inputElement) => { 
        inputElement.addEventListener('input', () => { 
            checkInputValidity(inputElement, validationParams); 
            toggleButtonState(inputList, buttonElement, validationParams);
        });
    });
};

function popupErrorUpdate(formElement) {
    const inputsArray = Array.from(formElement.querySelectorAll('.popup__input'));

    inputsArray.forEach((inputElement) => {
        hideInputError(inputElement, validationParams);
    });
}

const updateFormButtonState = (formElement, validationParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputElement));
    const buttonElement = formElement.querySelector(validationParams.buttonElement); 

    toggleButtonState(inputList, buttonElement, validationParams);
};

const enableValidation = (validationParams) => {

    const formElements = Array.from(document.querySelectorAll(validationParams.formElement));
    formElements.forEach((formElement) => { 
        updateFormButtonState(formElement, validationParams); 
        setEventListeners(formElement, validationParams); 

        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });    
    });
};
