let editButton = document.querySelector('.profile__button');
let popupWindow = document.querySelector('.popup');
let popupClose = popupWindow.querySelector('.popup__close');
let formElement = popupWindow.querySelector('.popup__form');
let popupSubmit = formElement.querySelector('.popup__submit');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_about');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');

function popupToggle() {
    
    if (popupWindow.classList.contains('popup_opened')) {
        popupWindow.classList.remove('popup_opened');
    } else {
        popupWindow.classList.add('popup_opened');

        nameInput.value = nameElement.textContent;
        jobInput.value = jobElement.textContent;
    }
}

function formSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle();
}

editButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);