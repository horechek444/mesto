const editButton = document.querySelector('.profile__button');
const popupWindow = document.querySelector('.popup');
const popupClose = popupWindow.querySelector('.popup__close');
const formElement = popupWindow.querySelector('.popup__form');
const popupSubmit = formElement.querySelector('.popup__submit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

function formSubmitHandler (event) {
    event.preventDefault(); 

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
}

formElement.addEventListener('submit', formSubmitHandler);

function popupToggle(event) {
    popupWindow.classList.toggle('popup_opened');
}

function closeOutOfPopup(event) {
    if (event.target !== event.currentTarget) {
        return
    } popupToggle();
}

editButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
popupWindow.addEventListener('click', closeOutOfPopup);