let editButton = document.querySelector('.profile__button');
let editPopup = document.querySelector('.edit');
let editClose = editPopup.querySelector('.edit__close');
let editForm = editPopup.querySelector('.edit__form');
let editSubmit = editForm.querySelector('.edit__submit');
let nameInput = editForm.querySelector('.popup__input_type_name');
let jobInput = editForm.querySelector('.popup__input_type_about');
let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');

let addButton = document.querySelector('.button_add');
let addPopup = document.querySelector('.add');
let addClose = addPopup.querySelector('.add__close');
let addForm = addPopup.querySelector('.add__form');
let addSubmit = addForm.querySelector('.add__submit');
let titleInput = addForm.querySelector('.popup__input_type_title');
let imageLinkInput = addForm.querySelector('.popup__input_type_link');

let pictureTemplate = document.querySelector('#picture').content;
let pictures = document.querySelector('.pictures__list');

// Открытие-закрытие попапов
function popupToggle(popup) {
    return function () {
        popup.classList.toggle('popup_opened')
    } 
}

// Редактирование данных в попапе edit
function formSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle(editPopup)();
}

editButton.addEventListener('click', function() {
    popupToggle(editPopup)();

    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
});

editClose.addEventListener('click', popupToggle(editPopup));
editForm.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', popupToggle(addPopup));
addClose.addEventListener('click', popupToggle(addPopup));

function elementMaker() {
    let pictureElements = [];
    for (let i = 0; i < 6; i++) {
        pictureElements[i] = pictureTemplate.cloneNode(true);
        
    } return pictureElements;
}
console.log(elementMaker());

let pictureElement_1 = pictureTemplate.cloneNode(true);

pictureElement_1.querySelector('.pictures__image').src = './images/kaliningrad.jpg';
pictureElement_1.querySelector('.pictures__image').alt = "Калининград, двор-колодец";
pictureElement_1.querySelector('.pictures__title').textContent = 'Калининград';

pictures.append(pictureElement_1);