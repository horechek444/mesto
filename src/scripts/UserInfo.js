export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.user = this._userNameElement.textContent,
        this._userInfo.info = this._userInfoElement.textContent
        return this._userInfo;
    }

    // setUserInfo() {
        
    // }
}