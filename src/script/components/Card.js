export default class Card {
  constructor(
    { _id, name, link, likes, owner },
    userId,
    selector,
    handleImageClick,
    toggleLike,
    handleDelete
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._owner = owner;
    this._userId = userId;
    this._selector = selector;
    this._handleImageClick = handleImageClick;
    this._toggleLike = toggleLike;
    this._handleDelete = handleDelete;
  }

  checkLike() {
    return this.likes.some((like) => like._id === this._userId);
  }

  renderLike() {
    this._likeCounter.textContent = this.likes.length;
    if (this.checkLike()) {
      this._btnLike.classList.add("elements__like-button_active");
    }
    else {
      this._btnLike.classList.remove("elements__like-button_active");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getElement() {
    const card = document
      .querySelector(this._selector)
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
      this._btnTrash.style.display = "block";
    }
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._btnLike
      .addEventListener("click", () => {
        this._toggleLike(this);
      });

    this._btnTrash
      .addEventListener("click", () => {
        this._handleDelete(this);
      });

    this._cardImage
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }
}
