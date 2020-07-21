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

class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document.querySelector('.pictures-template').content.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const picturesImage = this._element.querySelector('.pictures__image');

        this._element.querySelector('.pictures__title').textContent = this._name;
        picturesImage.src = this._link;
        picturesImage.alt = this._name;

        return this._element;
    }
}

cardsList.forEach(item => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();

    document.querySelector('.pictures__list').append(cardElement);
});
