export const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.popup_type_edit');
export const editForm = editPopup.querySelector('.popup__form');
export const nameInput = editForm.querySelector('.popup__input_type_name');
export const jobInput = editForm.querySelector('.popup__input_type_about');
export const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.popup_type_add');
export const addForm = addPopup.querySelector('.popup__form');
export const picturesTemplateSelector = '.pictures-template';

export const userName = document.querySelector('.profile__title');
export const userAbout = document.querySelector('.profile__subtitle');

export const avatarImg = document.querySelector('.avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');
export const avatarForm = popupAvatar.querySelector('.popup__form');

export const deleteElement = document.createElement('button');
deleteElement.className = 'button pictures__delete opacity';
deleteElement.type = 'button';