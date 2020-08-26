import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, editForm, nameInput, jobInput, addButton, addForm, picturesTemplateSelector, avatarImg, avatarForm, userName, userAbout, token, url, validationParams, allSavedSubmits } from '../utils/variables.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';

function handleCardClick() {
    popupTypePicture.open();
}

function handleLikeClick(card, data) {
    const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
    promise
    .then((data) => { card.setLike(data) })
    .catch((err) => {
        console.log(`${err}`)
    });
}
const popupTypeDelete = new PopupWithSubmit('.popup_type_prevent');
popupTypeDelete.setEventListeners();

function handleCardDelete(card) {
    popupTypeDelete.setFormSubmitHandler(() => {
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();
                popupTypeDelete.close();
            })
            .catch((err) => {
                console.log(`${err}`)
            });
    });
    popupTypeDelete.open();
}

function renderLoading(isLoading) {
    if (isLoading) {
        Array.from(allSavedSubmits).forEach((submit) => {
            submit.value = "Сохранение...";
        })
    } else {
        Array.from(allSavedSubmits).forEach((submit) => {
            submit.value = "Сохранить";
        })
    }
}

function newCardMaker(data, currentUserId, cardsList) {
    const newCard = new Card(data, 
        handleCardClick, {
        handleLikeClick: () => handleLikeClick(newCard, data),
        handleCardDelete: () => handleCardDelete(newCard) }, 
        currentUserId, 
        picturesTemplateSelector);
    const cardElement = newCard.generateCard();
    cardsList.addItem(cardElement);
}

const validAdd = new FormValidator(validationParams, addForm);
validAdd.enableValidation();

const validEdit = new FormValidator(validationParams, editForm);
validEdit.enableValidation();

const validAvatar = new FormValidator(validationParams, avatarForm);
validAvatar.enableValidation();

const popupTypePicture = new PopupWithImage('.popup_type_picture');
popupTypePicture.setEventListeners();

const api = new Api({ 
    baseUrl: url, 
    headers: { 
        authorization: token,
        'Content-Type': 'application/json',
    }
})

api.getUserInfo()
.then((result) => {
    const user = new UserInfo({ userNameElement: userName, userInfoElement: userAbout });
    user.setUserInfo(result);
    const userData = user.getUserInfo();
    avatarImg.style.backgroundImage = `url(${result.avatar})`;
    const currentUserId = result._id;
    
    const popupTypeEdit = new PopupWIthForm({
        popupSelector: '.popup_type_edit',
        handleFormSubmit: (item) => {
            renderLoading(true);
            api.setUserInfo(item)
            .then((data) => {
                user.setUserInfo(data);
            })
            .catch((err) => {
                console.log(`${err}`)
            })
            .finally(() => {
                renderLoading(false);
                popupTypeEdit.close();
            })
        }
    });
    
    popupTypeEdit.setEventListeners();

    editButton.addEventListener('click', () => {
        validEdit.updateErrorsAndButtonState(editForm);

        nameInput.value = userData.name;
        jobInput.value = userData.about;

        nameInput.dispatchEvent(new Event('input'));
        jobInput.dispatchEvent(new Event('input'));
    
        popupTypeEdit.open(); 
    });

    api.getCards()
    .then((cards) => {
        const cardsList = new Section({
            items: cards,
            renderer: (item) => { newCardMaker(item, currentUserId, cardsList) },
        }, '.pictures__list')
        
        cardsList.renderItems();
    
        const popupTypeAdd = new PopupWIthForm({
            popupSelector: '.popup_type_add',
            handleFormSubmit: (item) => {
                renderLoading(true);
                api.createCard(item)
                .then((data) => { newCardMaker(data, currentUserId, cardsList) })
                .catch((err) => {
                    console.log(`${err}`)
                })
                .finally(() => {
                    renderLoading(false);
                    popupTypeAdd.close();
                })
            }
        });
        
        popupTypeAdd.setEventListeners();
        
        addButton.addEventListener('click', () => {
            validAdd.updateErrorsAndButtonState(addForm);
            popupTypeAdd.open();
        });

        const popupTypeAvatar = new PopupWIthForm({
            popupSelector: '.popup_type_avatar',
            handleFormSubmit: (item) => {
                renderLoading(true);
                api.setAvatar(item)
                .then((data) => {
                    avatarImg.style.backgroundImage = `url(${data.avatar})`;
                })
                .catch((err) => {
                    console.log(`${err}`)
                })
                .finally(() => {
                    renderLoading(false);
                    popupTypeAvatar.close();
                })
            }
        });
        
        popupTypeAvatar.setEventListeners();
        
        avatarImg.addEventListener('click', () => {
            validAvatar.updateErrorsAndButtonState(avatarForm);
            popupTypeAvatar.open();
        });
    })
    .catch((err) => {
        console.log(`${err}`)
    });
})
.catch((err) => {
    console.log(`${err}`)
});
