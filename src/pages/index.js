import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';;
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { editButton, editForm, nameInput, jobInput, addButton, addForm, picturesTemplateSelector, avatarImg, avatarForm, userName, userAbout, token, url } from '../utils/variables.js';
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
            api.setUserInfo(item)
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

    api.getCards()
    .then((cards) => {

        // const popupTypePrevent = new PopupWithSubmit('.popup_type_prevent');
        // popupTypePrevent.setEventListeners();

        const cardsList = new Section({
            items: cards,
            renderer: (item) => {
                const card = new Card(item, handleCardClick, { 
                    handleLikeClick: () => {
                        // let isLiked = ((cardElement.querySelector('.pictures__like').classList.contains('pictures__like_active')) && (item.likes.length > 0));
                        // console.log(card.isLiked());
                        const promise = card.isLiked() ? api.dislikeCard(item._id) : api.likeCard(item._id);
                        promise.then((data) => { card.setLike(data); });
                    }
                }, currentUserId, picturesTemplateSelector);
                const cardElement = card.generateCard();
                cardsList.addItem(cardElement);
            },
        }, '.pictures__list')
        
        cardsList.renderItems();
    
        const popupTypeAdd = new PopupWIthForm({
            popupSelector: '.popup_type_add',
            handleFormSubmit: (item) => {
                api.createCard(item)
                .then((data) => {
                    const userCard = new Card(data, handleCardClick, { handleLikeClick: null }, currentUserId, picturesTemplateSelector);
                    const cardElement = userCard.generateCard();
                    cardsList.addItem(cardElement);
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
                api.setAvatar(item)
                .then((data) => {
                    avatarImg.style.backgroundImage = `url(${data.avatar})`;
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
});

