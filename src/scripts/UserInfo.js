export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return this._userInfo = {
            name: this._userNameElement.textContent,
            info: this._userInfoElement.textContent
        };
    }

    setUserInfo() {
        
    }
}