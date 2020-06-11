const editButton = document.querySelector('.profile__button');
const popupWindow = document.querySelector('.popup');
const popupClose = popupWindow.querySelector('.popup__close');
const formElement = popupWindow.querySelector('.popup__form');
const popupSubmit = formElement.querySelector('.popup__submit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
}

formElement.addEventListener('submit', formSubmitHandler);


function popupOpener () {

    editButton.addEventListener('click',function (evt) {
        evt.preventDefault();
        popupWindow.classList.add('popup_opened');
    });
}

popupOpener();

function popupCloser () {

    popupClose.addEventListener('click',function (evt) {
        evt.preventDefault();
        popupWindow.classList.remove('popup_opened');
    });
}

popupCloser();