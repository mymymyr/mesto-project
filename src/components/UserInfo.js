export default class UserInfo {
    constructor({profileTitle, profileSubtitle, avatar}) {
        this._profileTitle = document.querySelector(profileTitle);
        this._profileSubtitle = document.querySelector(profileSubtitle);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        const userInfo = { 
            profileTitle: this._profileTitle.textContent,
            profileSubtitle: this._profileSubtitle.textContent,
            userId: this._userId
        }
        return userInfo;
    }

    setUserInfo(data) {
        this._profileTitle.textContent = data.name;
        this._profileSubtitle.textContent = data.about;
        this._avatar.src = data.avatar;
        this._userId = data._id;
    }

}