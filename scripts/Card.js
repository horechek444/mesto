import { popupElement } from '../scripts/index.js';
import { popupImage } from '../scripts/index.js';
import { popupCloseButton } from '../scripts/index.js';
import { popupCaption } from '../scripts/index.js';
import { showPopupPicturesElement } from '../scripts/utils.js';

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.pictures__item').cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const picturesImage = this._element.querySelector('.pictures__image');
        this._setEventListeners();

        this._element.querySelector('.pictures__title').textContent = this._name;
        picturesImage.src = this._link;
        picturesImage.alt = this._name;

        return this._element;
    }

    _handleOpenPopup = () => {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;

        popupElement.classList.add('popup_opened');
    }

    _handleClosePopup = () => {
        popupImage.src = '';
        popupImage.alt = '';
        popupCaption.textContent = '';
        
        popupElement.classList.remove('popup_opened');
    }

    _likeCard = () => {
        this._element.querySelector('.pictures__like').classList.toggle('pictures__like_active');
    }

    _deleteCard = () => {
        this._removeEventListeners();
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.pictures__image').addEventListener('click', this._handleOpenPopup);
        popupCloseButton.addEventListener('click', this._handleClosePopup);

        this._element.querySelector('.pictures__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.pictures__like').addEventListener('click', this._likeCard);
    }

    _removeEventListeners() {
        this._element.querySelector('.pictures__image').removeEventListener('click', this._handleOpenPopup);
        popupCloseButton.removeEventListener('click', this._handleClosePopup);
        
        this._element.querySelector('.pictures__delete').removeEventListener('click', this._deleteCard);
        this._element.querySelector('.pictures__like').removeEventListener('click', this._likeCard);
    }
}