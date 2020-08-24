export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}users/me`, { 
            headers: this.headers,
        })
        .then(res => res.json())
    }

    getCards() {
        return fetch(`${this.baseUrl}cards`, { 
            headers: this.headers,
        })
        .then(res => res.json())
    }

    setUserInfo(item) {
        return fetch(`${this.baseUrl}users/me`, {
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
        return fetch(`${this.baseUrl}cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
            })
        })
        .then(res => res.json())
    }

    deleteCard(id) { 
        return fetch(`${this.baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(res => res.json())
    }

    likeCard(id) { 
        return fetch(`${this.baseUrl}cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(res => res.json())
    }

    dislikeCard(id) { 
        return fetch(`${this.baseUrl}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(res => res.json())
    }

    setAvatar(avatar) {
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar),
        })
        .then(res => res.json())
    }
}
