export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInfo() {
        return fetch(this.baseUrl, { 
            headers: this.headers,
        })
        .then(res => res.json())
    }

    setUserInfo(item) {
        return fetch(this.baseUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        })
        .then(res => res.json()) 
    }

    createCard(newCard) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
            method: 'POST',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
        
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }

    getCardLikes() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
    }

    deleteCard(card) { // узнать ID карточки, подставить в URL и удалить ее из списка карточек
        fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/cardId', {
            method: 'DELETE',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
            body: JSON.stringify({
                ID: card._id,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
        
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }

    likeCard(card) {
        fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId', {
            method: 'PUT',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
            body: JSON.stringify({
                ID: card._id,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
        
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }

    dislikeCard(card) {
        fetch('https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId', {
            method: 'DELETE',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
            body: JSON.stringify({
                ID: card._id,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
        
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }

    setAvatar(avatar) {
        fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
            body: JSON.stringify({
                avatar: avatar.link,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        })
        
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }
}
