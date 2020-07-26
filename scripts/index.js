import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { cardsList } from '../scripts/cards.js';
import { openPopup } from '../scripts/utils.js';
import { closePopup } from '../scripts/utils.js';
import { closePopupByOverlay } from '../scripts/utils.js';
import { closePopupByEsc } from '../scripts/utils.js';

const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupClose = editPopup.querySelector('.popup__close');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.popup_type_add');
const addPopupClose = addPopup.querySelector('.popup__close');
const addForm = addPopup.querySelector('.popup__form');
const titleInput = addForm.querySelector('.popup__input_type_title');
const linkInput = addForm.querySelector('.popup__input_type_link');

export const popupElement = document.querySelector('.popup_type_picture');
export const popupImage = popupElement.querySelector('.popup__image');
export const popupCloseButton = popupElement.querySelector('.popup__close');
export const popupCaption = popupElement.querySelector('.popup__caption');
const picturesListElement = document.querySelector('.pictures__list');

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

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEsc);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEsc);
// }

function editFormSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(editPopup);
}

// function deletePicturesElement(event) {
//     const picturesElement = event.target.closest('.pictures__item');
//     picturesElement.remove();
// }

// function likePicturesElement(event) {
//     event.target.classList.toggle('pictures__like_active');
// }

// function showPopupPicturesElement(event) {
//     const picturesElement = event.target.closest('.pictures__image');

//     picturePopupImage.src = picturesElement.src;
//     picturePopupCaption.textContent = picturesElement.alt;
//     openPopup(picturePopup); 
// }

// function addPicturesElementListeners(picturesElement) {
//     picturesElement.querySelector('.pictures__delete').addEventListener('click', deletePicturesElement);
//     picturesElement.querySelector('.pictures__like').addEventListener('click', likePicturesElement);
//     picturesElement.querySelector('.pictures__image').addEventListener('click', showPopupPicturesElement);
// }

// function createPicturesElement(newElement) {
//     const picturesElement = picturesTemplateElement.content.cloneNode(true);
//     const picturesImage = picturesElement.querySelector('.pictures__image');

//     picturesElement.querySelector('.pictures__title').textContent = newElement.name;
//     picturesImage.src = newElement.link;
//     picturesImage.alt = newElement.name;
//     addPicturesElementListeners(picturesElement);

//     return picturesElement;
// }

function renderPicturesElement(element) {
    picturesListElement.prepend(element);
}

function addFormSubmitHandler(event) {
    event.preventDefault();

    const newElement = {
        name: titleInput.value,
        link: linkInput.value
    };

    const userCard = new Card(newElement, '.pictures-template');
    const cardElement = userCard.generateCard();

    renderPicturesElement(cardElement);
    closePopup(addPopup); 
}

// function closePopupByOverlay(event) {
//     const currentPopup = document.querySelector('.popup_opened');
//     if (currentPopup && event.target === event.currentTarget) { 
//         closePopup(currentPopup); 
//     }
// }

// function closePopupByEsc(event) {
//     const currentPopup = document.querySelector('.popup_opened');
//     if (currentPopup && event.key === 'Escape') { 
//         closePopup(currentPopup);
//     }
// }

editButton.addEventListener('click', () => {
    validEdit.updateErrorsAndButtonState(editForm);

    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    openPopup(editPopup); 
});

editPopupClose.addEventListener('click', () => closePopup(editPopup)); 
editForm.addEventListener('submit', editFormSubmitHandler);
editPopup.addEventListener('mousedown', closePopupByOverlay);

addButton.addEventListener('click', () => {
    addForm.reset();
    validAdd.updateErrorsAndButtonState(addForm);
    openPopup(addPopup);
});

addPopupClose.addEventListener('click', () => closePopup(addPopup)); 
addForm.addEventListener('submit', addFormSubmitHandler);
addPopup.addEventListener('mousedown', closePopupByOverlay);

// picturePopupClose.addEventListener('click', () => closePopup(picturePopup)); 
popupElement.addEventListener('mousedown', closePopupByOverlay);

// initialPicturesElements.forEach(item => {
//     const element = createPicturesElement(item);
//     renderPicturesElement(element);
// });

// enableValidation(validationParams);

cardsList.forEach(item => {
    const card = new Card(item, '.pictures-template');
    const cardElement = card.generateCard();

    renderPicturesElement(cardElement);
});

const validAdd = new FormValidator(validationParams, addForm);
const formAddValid = validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
const formEditValid = validEdit.enableValidation();

// const formsList = Array.from(document.forms);
// formsList.forEach(form => {
//     const formClassNames = form.className;
//     const formSelectors = formClassNames.split(' ');
//     const valid = new FormValidator(validationParams, formSelectors[1]);
    
// })
