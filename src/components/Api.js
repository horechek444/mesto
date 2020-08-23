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

    setInfo(item) {
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
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
        .then(res => res.json())
    }

    deleteCard(id) { // узнать ID карточки, подставить в URL и удалить ее из списка карточек  'https://mesto.nomoreparties.co/v1/cohort-14/cards/cardId'
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(res => res.json())
    }

    likeCard(card) { // 'https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId'
        return fetch(this.baseUrl, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({
                ID: card._id,
            })
        })
        .then(res => res.json())
    }

    dislikeCard(card) { // 'https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId'
        return fetch(this.baseUrl, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                ID: card._id,
            })
        })
        .then(res => res.json())
    }

    setAvatar(avatar) {
        return fetch(this.baseUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar),
        })
        .then(res => res.json())
    }
}
