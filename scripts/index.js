import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { cardsList } from '../scripts/cards.js';
import { openPopup, closePopup, closePopupByEscOrOverlay, popupElement } from '../scripts/utils.js';

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

const picturesTemplateSelector = '.pictures-template';
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

function editFormSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(editPopup);
}

function renderPicturesElement(element) {
    picturesListElement.prepend(element);
}

function addFormSubmitHandler(event) {
    event.preventDefault();

    const newElement = {
        name: titleInput.value,
        link: linkInput.value
    };

    const userCard = new Card(newElement, picturesTemplateSelector);
    const cardElement = userCard.generateCard();

    renderPicturesElement(cardElement);
    closePopup(addPopup); 
}
const validAdd = new FormValidator(validationParams, addForm);
validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
validEdit.enableValidation();

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
editPopup.addEventListener('mousedown', closePopupByEscOrOverlay);

addButton.addEventListener('click', () => {
    addForm.reset();
    validAdd.updateErrorsAndButtonState(addForm);
    openPopup(addPopup);
});

addPopupClose.addEventListener('click', () => closePopup(addPopup)); 
addForm.addEventListener('submit', addFormSubmitHandler);
addPopup.addEventListener('mousedown', closePopupByEscOrOverlay);

popupElement.addEventListener('mousedown', closePopupByEscOrOverlay);

cardsList.forEach(item => {
    const card = new Card(item, picturesTemplateSelector);
    const cardElement = card.generateCard();

    renderPicturesElement(cardElement);
});
