class Api {
    constructor() {

    }

    getUserInfo() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
            },
        })
    
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
    }

    getInitialCards() {
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

    profileEdit(newProfile) {
        fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '015c5709-d89c-4f94-866c-ab8c6888fc92',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newProfile.name,
                about: newProfile.about,
            }),
        })

        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
    }

    cardAdd(newCard) {
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

    cardDelete(card) { // узнать ID карточки, подставить в URL и удалить ее из списка карточек
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
        });
    }

    cardLike(card) {
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
        });
    }

    cardDislike(card) {
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
        });
    }
}
