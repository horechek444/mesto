const showInputError = (inputElement, errorMessage, validationParams) => {
    const errorElement = inputElement.closest('.popup__control').querySelector('.popup__error');

    inputElement.classList.add(validationParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationParams.errorShowClass);
};

const hideInputError = (inputElement, validationParams) => {
    const errorElement = inputElement.closest('.popup__control').querySelector('.popup__error');

    inputElement.classList.remove(validationParams.inputErrorClass);
    errorElement.classList.remove(validationParams.errorShowClass);
    errorElement.textContent = '';
};

const isValid = (inputElement, validationParams) => {
    if(!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, validationParams);
    } else {
        hideInputError(inputElement, validationParams);
    }
};

const setEventListeners = (formElement, validationParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputElement));
    const buttonElement = formElement.querySelector(validationParams.buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(inputElement, validationParams);
            toggleButtonState(inputList, buttonElement, validationParams);
        });
    });
};

const updateFormState = (formElement, validationParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validationParams.inputElement));
    const buttonElement = formElement.querySelector(validationParams.buttonElement);

    toggleButtonState(inputList, buttonElement, validationParams);

    inputList.forEach((inputElement) => {
        isValid(inputElement, validationParams);
    });
};

const enableValidation = (validationParams) => {

    const formElements = Array.from(document.querySelectorAll(validationParams.formElement));
    formElements.forEach((formElement) => {

        updateFormState(formElement, validationParams);
        setEventListeners(formElement, validationParams);

        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });    
    });
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

enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__submit',    
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
});