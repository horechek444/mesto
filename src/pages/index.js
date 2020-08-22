import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, editForm, nameInput, jobInput, addButton, addForm, picturesTemplateSelector, avatarImg, avatarForm, deleteElement, userName, userAbout } from '../utils/variables.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';

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

function handleCardPrevent() {
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

const apiForGetUserInfo = new Api({ 
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me', 
    headers: { 
        authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92', 
    }
})

const apiForSetInfo = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
    headers: {
        authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
        'Content-Type': 'application/json',
    }
})

apiForGetUserInfo.getInfo()
.then((result) => {
    userName.textContent = result.name;
    userAbout.textContent = result.about;
    console.log(result);
    const user = new UserInfo({ userNameElement: userName, userInfoElement: userAbout });
    
    const popupTypeEdit = new PopupWIthForm({
        popupSelector: '.popup_type_edit',
        handleFormSubmit: (item) => {
            apiForSetInfo.setInfo(item)
            .then((data) => {
                user.setUserInfo(data);
                popupTypeEdit.close();
            })
        }
    });
    
    popupTypeEdit.setEventListeners();

    editButton.addEventListener('click', () => {
        validEdit.updateErrorsAndButtonState(editForm);

        nameInput.value = user.getUserInfo().name;
        jobInput.value = user.getUserInfo().about;
    
        nameInput.dispatchEvent(new Event('input'));
        jobInput.dispatchEvent(new Event('input'));
    
        popupTypeEdit.open(); 
    });
});

const apiForSetAvatar = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar',
    headers: {
        authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
        'Content-Type': 'application/json',
    }
})

const popupTypeAvatar = new PopupWIthForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (item) => {
        console.log(item);
        apiForSetAvatar.setAvatar(item)
        .then((data) => {
            avatarImg.style.backgroundImage = `url(${data.avatar})`;
            popupTypeAvatar.close();
        })
    }
});

popupTypeAvatar.setEventListeners();

// const popupTypePrevent = new PopupWithSubmit({ 
//     popupSelector: '.popup_type_prevent',
//     handleFormSubmit: () => {

//     }});
// popupTypePrevent.setEventListeners();

avatarImg.addEventListener('click', () => {
    validAvatar.updateErrorsAndButtonState(avatarForm);
    popupTypeAvatar.open();
});

deleteElement.addEventListener('click', () => handleCardPrevent());

const apiForGetCards = new Api({ 
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/cards', 
    headers: { 
        authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92', 
    }
})

apiForGetCards.getInfo()
.then((cards) => {
    const cardsList = new Section({
        items: cards,
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
    
    addButton.addEventListener('click', () => {
        validAdd.updateErrorsAndButtonState(addForm);
        popupTypeAdd.open();
    });
})

