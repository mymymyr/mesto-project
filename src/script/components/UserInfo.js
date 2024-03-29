export default class UserInfo {
  constructor({profileTitle, profileSubtitle, avatar}) {
      this._profileTitle = document.querySelector(profileTitle);
      this._profileSubtitle = document.querySelector(profileSubtitle);
      this._avatar = document.querySelector(avatar);
  }

  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent
    }
  }

  setUserInfo(data) {
      this._profileTitle.textContent = data.name;
      this._profileSubtitle.textContent = data.about;
      this._avatar.src = data.avatar;
      this._userId = data._id;
  }

}
