export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, reverse = false) {
    if(reverse) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }

  renderItems(initialCards) {
    initialCards.forEach(item => {
      this._renderer(item);
    });
  }
}
