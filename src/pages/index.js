import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, editForm, nameInput, jobInput, addButton, addForm, picturesTemplateSelector, avatarImg, avatarForm, userName, userAbout, token, url, validationParams, editSubmit, addSubmit, avatarSubmit } from '../utils/variables.js';
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
        Array.from(document.querySelectorAll('.popup__submit_type_save')).forEach((submit) => {
            submit.value = "Сохранение...";
        })
    } else {
        Array.from(document.querySelectorAll('.popup__submit_type_save')).forEach((submit) => {
            submit.value = "Сохранить";
        })
    }
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
    userName.textContent = result.name;
    userAbout.textContent = result.about;
    avatarImg.style.backgroundImage = `url(${result.avatar})`;
    const currentUserId = result._id;

    const user = new UserInfo({ userNameElement: userName, userInfoElement: userAbout });
    
    const popupTypeEdit = new PopupWIthForm({
        popupSelector: '.popup_type_edit',
        handleFormSubmit: (item) => {
            renderLoading(true);
            api.setUserInfo(item)
            .then((data) => {
                user.setUserInfo(data);
                popupTypeEdit.close();
            })
            .catch((err) => {
                console.log(`${err}`)
            })
            .finally(() => {
                renderLoading(false);
            });
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

    api.getCards()
    .then((cards) => {
        const cardsList = new Section({
            items: cards,
            renderer: (item) => {
                const card = new Card(item, 
                    handleCardClick, {
                    handleLikeClick: () => handleLikeClick(card, item),
                    handleCardDelete: () => handleCardDelete(card) }, 
                    currentUserId, 
                    picturesTemplateSelector);
                const cardElement = card.generateCard();
                cardsList.addItem(cardElement);
            },
        }, '.pictures__list')
        
        cardsList.renderItems();
    
        const popupTypeAdd = new PopupWIthForm({
            popupSelector: '.popup_type_add',
            handleFormSubmit: (item) => {
                renderLoading(true);
                api.createCard(item)
                .then((data) => {
                    const userCard = new Card(data, 
                        handleCardClick, { 
                        handleLikeClick: () => handleLikeClick(userCard, data), 
                        handleCardDelete: () => handleCardDelete(userCard) }, 
                        currentUserId, 
                        picturesTemplateSelector);
                    const cardElement = userCard.generateCard();
                    cardsList.addItem(cardElement);
                    popupTypeAdd.close();
                })
                .catch((err) => {
                    console.log(`${err}`)
                })
                .finally(() => {
                    renderLoading(false);
                });
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
                    popupTypeAvatar.close();
                })
                .catch((err) => {
                    console.log(`${err}`)
                })
                .finally(() => {
                    renderLoading(false);
                });
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
