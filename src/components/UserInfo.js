export default class UserInfo {
    constructor({ userNameElement, userInfoElement }) {
        this._userNameElement = userNameElement;
        this._userInfoElement = userInfoElement;
    }

    getUserInfo() {
        return { 
            name: this._userNameElement,
            about: this._userInfoElement 
        };
    }

    setUserInfo(data) {
        this._userNameElement = data.name;
        this._userInfoElement = data.about;
    }
}