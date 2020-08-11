import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { cardsArray } from '../utils/cards.js';

const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');

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
    popupTypePicture.open();
}
const validAdd = new FormValidator(validationParams, addForm);
validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
validEdit.enableValidation();

const popupTypePicture = new PopupWithImage('.popup_type_picture');
popupTypePicture.setEventListeners();

const user = new UserInfo({ userNameSelector: '.profile__title', userInfoSelector: '.profile__subtitle' });
const userInfo = user.getUserInfo();

const cardsList = new Section({
    items: cardsArray,
    renderer: (item) => {
        const card = new Card(item, handleCardClick, picturesTemplateSelector);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    },
}, '.pictures__list')

cardsList.renderItems();

const popupTypeAdd = new PopupWIthForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (item) => {
        const userCard = new Card(item, handleCardClick, picturesTemplateSelector);
        const cardElement = userCard.generateCard();
        cardsList.addItem(cardElement);
        popupTypeAdd.close();
    }
});

popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWIthForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (item) => {
        user.setUserInfo(item);
        popupTypeEdit.close();
    }
});

popupTypeEdit.setEventListeners();

editButton.addEventListener('click', () => {
    validEdit.updateErrorsAndButtonState(editForm);

    nameInput.value = userInfo.user;
    jobInput.value = userInfo.info;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    popupTypeEdit.open(); 
});

addButton.addEventListener('click', () => {
    validAdd.updateErrorsAndButtonState(addForm);
    popupTypeAdd.open();
});