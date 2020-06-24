let editButton = document.querySelector('.profile__button');
let popupEdit = document.querySelector('.popup_edit');
let popupClose = popupEdit.querySelector('.popup__close');
let formElement = popupEdit.querySelector('.popup__form');
let popupSubmit = formElement.querySelector('.popup__submit');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_about');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');

let addButton = document.querySelector('.button__add');
let popupNewPlace = document.querySelector('.popup_new-place');
let popupNewClose = popupNewPlace.querySelector('.popup__close');
let formAddPopup = popupNewPlace.querySelector('.popup__form');
let popupSubmit = formAddPopup.querySelector('.popup__submit');
let titleInput = formAddPopup.querySelector('.popup__input_type_title');
let imageLinkInput = formAddPopup.querySelector('.popup__input_type_link');


function popupToggle() {
    
    if (popupEdit.classList.contains('popup_opened')) {
        popupEdit.classList.remove('popup_opened');
    } else {
        popupEdit.classList.add('popup_opened');

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


function popupNewToggle() {
    popupNewPlace.classList.toggle('popup_opened');
}

addButton.addEventListener('click', popupNewToggle);