import './index.css';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWIthForm from '../scripts/PopupWithForm.js';;
import FormValidator from '../scripts/FormValidator.js';
import UserInfo from '../scripts/UserInfo.js';
import { cardsArray } from '../scripts/cards.js';

const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.popup__form');

const picturesTemplateSelector = '.pictures-template';

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

function handleCardClick() {
    popupPictureNew.open();
}

// function editFormSubmitHandler(event) {
//     event.preventDefault(); 
    
//     nameElement.textContent = nameInput.value; //set
//     jobElement.textContent = jobInput.value;
//     editPopupNew.close();
// }

const validAdd = new FormValidator(validationParams, addForm);
validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
validEdit.enableValidation();

// editForm.addEventListener('submit', editFormSubmitHandler); // submitEditFormCallback

addButton.addEventListener('click', () => {
    validAdd.updateErrorsAndButtonState(addForm);
    addPopupNew.open();
});

const popupPictureNew = new PopupWithImage('.popup_type_picture');
popupPictureNew.setEventListeners();

const addPopupNew = new PopupWIthForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (item) => {
        const userCard = new Card(item, handleCardClick, picturesTemplateSelector);
        const cardElement = userCard.generateCard();
        cardsList.addItem(cardElement);
        addPopupNew.close();
    }
});

addPopupNew.setEventListeners();

const cardsList = new Section({
    items: cardsArray,
    renderer: (item) => {
        const card = new Card(item, handleCardClick, picturesTemplateSelector);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    },
}, '.pictures__list')

cardsList.renderItems();

// const user = new UserInfo('.profile__title', '.profile__subtitle');
// const userInfo = user.getUserInfo();

const editPopupNew = new PopupWIthForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (item) => {
        nameElement.textContent = item.user;
        jobElement.textContent = item.info;
        editPopupNew.close();
    }
});
editPopupNew.setEventListeners();

editButton.addEventListener('click', () => {
    validEdit.updateErrorsAndButtonState(editForm);

    nameInput.value = nameElement.textContent; //get
    jobInput.value = jobElement.textContent;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    editPopupNew.open(); 
});