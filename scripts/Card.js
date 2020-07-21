const cardsList = [
    {
        name: 'Калининград',
        link: './images/kaliningrad.jpg'
    },
    {
        name: 'Саха',
        link: './images/sakha.jpg'
    },
    {
        name: 'Владивосток',
        link: './images/vladivostok.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/kamchatka.jpg'
    },
    {
        name: 'Сибирь',
        link: './images/siberia.jpg'
    },
    {
        name: 'Клин',
        link: './images/klin.jpg'
    }
];

const popupElement = document.querySelector('.popup_type_picture');
const popupImage = popupElement.querySelector('.popup__image');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupCaption = popupElement.querySelector('.popup__caption');

class Card {
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

    _handleOpenPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;

        popupElement.classList.add('popup_opened');
    }

    _handleClosePopup() {
        popupImage.src = '';
        popupImage.alt = '';
        popupCaption.textContent = '';

        popupElement.classList.remove('popup_opened');
    }

    _likeCard() {
        this._element.querySelector('.pictures__like').classList.toggle('pictures__like_active');
    }

    _setEventListeners() {
        this._element.addEventListener('click', () => {
            this._handleOpenPopup();
        });

        popupCloseButton.addEventListener('click', () => {
            this._handleClosePopup();
        });
    }
}

cardsList.forEach(item => {
    const card = new Card(item, '.pictures-template');
    const cardElement = card.generateCard();

    document.querySelector('.pictures__list').prepend(cardElement);
});
