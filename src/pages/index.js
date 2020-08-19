import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { cardsArray } from '../utils/cards.js';
import { editButton, editForm, nameInput, jobInput, addButton, addForm, picturesTemplateSelector, avatarImg, avatarForm, deleteElement } from '../utils/variables.js';
import Popup from '../components/Popup';

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

function handleCardDelete() {
    popupTypePrevent.open();
}

const validAdd = new FormValidator(validationParams, addForm);
validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
validEdit.enableValidation();

const validAvatar = new FormValidator(validationParams, avatarForm);
validAvatar.enableValidation();

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
        cardElement.prepend(deleteElement);
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

const popupTypeAvatar = new PopupWIthForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (item) => {
        avatarImg.style.backgroundImage = `url(${item.avatar})`;
        popupTypeAvatar.close();
    }
});

popupTypeAvatar.setEventListeners();

const popupTypePrevent = new Popup('.popup_type_prevent');
popupTypePrevent.setEventListeners();

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

avatarImg.addEventListener('click', () => {
    validAvatar.updateErrorsAndButtonState(avatarForm);
    popupTypeAvatar.open();
});

deleteElement.addEventListener('click', () => handleCardDelete());