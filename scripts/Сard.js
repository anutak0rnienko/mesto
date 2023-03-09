
// export default class Card {
//   static _template = document.querySelector("#card-template").content;
//   constructor ({link, name, handleLikeClick, handleCardDelete, handleImgOpen}, selectors) {
//     this._name = name;
//     this._link = link;
//     this._selectors = selectors;
//     this._handleLikeClick = handleLikeClick;
//     this._handleCardDelete = handleCardDelete;
//     this._handleImgOpen = handleImgOpen;
//   }

//   _getCardTemplate () {
//     this._item = Card._template.querySelector(this._selectors.card).cloneNode(true);
//     this._setEventListeners()
//     const elementCardImg = this._item.querySelector(this._selectors.image);
//     const elementCardText = this._item.querySelector(this._selectors.text);
//     elementCardText.textContent = this._name;
//     elementCardImg.src = this._link;
//     elementCardImg.alt = this._name;
//     return this._item;
//   }

//   _setEventListeners() {
//     const buttonLike = this._item.querySelector(this._selectors.buttonLike);
//     buttonLike.addEventListener('click', () => this._handleLikeClick());

//     const buttonDelete = this._item.querySelector(this._selectors.buttonDelete);
//     buttonDelete.addEventListener('click', this._handleCardDelete);

//     const elementCardImg = this._item.querySelector(this._selectors.image);
//     elementCardImg.addEventListener('click', this._handleImgOpen);
//   }

//   _handleLikeClick() {
//     this._buttonLike.classList.toggle('element__like_active');
//   };

//   _handleCardDelete() {
//     this._buttonDelete.closest('.element').remove();
//   };

// }

export default class Card {
  static _template = document.querySelector("#card-template").content;
  constructor (data, selectors, handleImgOpen) {
    this._name = data.name;
    this._link = data.link;
    this._selectors = selectors;
    this._handleImgOpen = handleImgOpen;
  }

  _getCardTemplate() {
    const element = document.querySelector(this._selectors).content.querySelector('.element').cloneNode(true);
    // const element = Card._template.querySelector(this._selectors.card).cloneNode(true);
    return element;
  };

  createCardElement() {
    this._element = this._getCardTemplate();
    this.elementCardText = this._element.querySelector('.element__text');
    this.elementCardText.textContent = this._name;
    this.elementCardImg = this._element.querySelector('.element__image');
    this.elementCardImg.src = this._link;
    this.elementCardImg.alt = this._name;
    this._cardElementLike = this._element.querySelector('.element__like');
    this._cardElementDel = this._element.querySelector('.element__delete');

    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._handleLikeClick());
    this._cardElementDel.addEventListener('click', () => this._handleCardDelete());
    this.elementCardImg.addEventListener('click', () =>
      this._handleImgOpen({
        name: this._name,
        link: this._link
      }));
  };

  _handleLikeClick() {
    this._cardElementLike.classList.toggle('element__like_active');
  };

  _handleCardDelete() {
    this._element.closest('.element').remove();
  };
};

