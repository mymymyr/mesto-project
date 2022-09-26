export default class Card {
  constructor({ _id, name, link, likes, owner }, userId, selector) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._owner = owner;
    this._userId = userId;
    this._selector = selector;
  }

  checkLike() {
    return this.likes.some(like => like._id === this._userID);
  }

  renderLike() {
      if (this.checkLike()) {
        this._btnLike.classList.add('gallery__btn-like_active');
        this._likeCounter.textContent = this.likes.length;
      } else {
        this._btnLike.classList.remove('gallery__btn-like_active');
        this._likeCounter.textContent = this.likes.length;
      }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getElement() {
    const card = document
      .querySelector("#elements__item-template")
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return card;
  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardTitle = this._element.querySelector(".elements__text");
    this._btnTrash = this._element.querySelector(".elements__trash-button");
    this._btnLike = this._element.querySelector(".elements__like-button");
    this._likeCounter = this._element.querySelector(".elements__like-counter");

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    this.renderLike();

    if (this._owner._id === this._userId) {
      this._btnTrash.style.display = 'block';
    }

    return this._element;
  }

  // _setEventListeners() {
  //   this._element._btnLike.addEventListener('click', () => {

  //   })

  //   this._element._btnTrash.addEventListener('click', () => {

  //   })

  //   this._element._cardImage.addEventListener('click', (name, link) => {

  //   })
  // }

}
