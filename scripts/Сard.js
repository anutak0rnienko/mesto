export default class Card {
  constructor (data, handleImgOpen) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector('#card-template').content.querySelector('.element');
    this._handleImgOpen = handleImgOpen;
  };

  _getCardTemplate() {
    this._element = this._template.cloneNode(true);
    return this._element;
  };

  createCardElement() {
    this._element = this._getCardTemplate();
    this._cardText = this._element.querySelector('.element__text');
    this._cardText.textContent = this._name;
    this._cardImg = this._element.querySelector('.element__image');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleCardDelete());
    this._cardImg.addEventListener('click', () =>
      this._handleImgOpen({
        name: this._name,
        link: this._link
      }));
  };

  _handleLikeClick() {
    this._buttonLike.classList.toggle('element__like_active');
  };

  _handleCardDelete() {
    this._element.closest('.element').remove();
  };
};

