export default class Card {
  constructor (data, template, handleImgOpen, userId, api, handleCardLike, handleCardDeleteLike, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleImgOpen = handleImgOpen;
    // this._id = data._id;
    this._userId = userId;
    // this._myId = data.owner._id;
    this._dataLikes = data.likes;
    this._api = api
    this._id = data._id;
    this._putLike = handleCardLike;
    this._removeLike = handleCardDeleteLike;
    this._handleCardDelete = handleCardDelete;
  };

  _getCardTemplate() {
    this._element = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return this._element;
  };

  // getCardId() {
  //   return this._id;
  // };

  createCardElement() {
    this._element = this._getCardTemplate();
    this._cardText = this._element.querySelector('.element__text');
    this._cardText.textContent = this._name;
    this._cardImg = this._element.querySelector('.element__image');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._counterLikes = this._element.querySelector('.element__numberlike');
    this._setEventListeners();
    // this._checkCardDelete();
    return this._element;
  };

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this.toggleLike());
    this._buttonDelete.addEventListener('click', () => this._deleteCards());
    this._cardImg.addEventListener('click', () =>
      this._handleImgOpen({
        name: this._name,
        link: this._link
      }));
  };

  // _handleLikeClick() {
  //   this._buttonLike.classList.toggle('element__like_active');
  // };

  // _checkCardDelete() {
  //   if (this._userId !== this._myId) {
  //     this._buttonDelete.remove();
  //   }
  // };

  _deleteCards() {
    this._element.remove();
  };


    // /** Функция проверки наличия лайка на карточке */
    checklikedCard() {
      return this._dataLikes.some(like => like._id === this._userId)
    };


  /**Функция изменения установки и снятия лайка */
  toggleLike() {
    if (this.checklikedCard()) {
      this._removeLike(this.id);
    } else {
      this._putLike(this.id);
    }
  }
  
   /**Функция общего отображения лайков и их колличества  */
  renderCardLike(card) {
    this._dataLikes = card.likes;
  if(this._dataLikes.length === 0) {
    this._counterLikes.textContent = '0';
  } else {
    this._counterLikes.textContent = this._dataLikes.length
  }
  if (this.checklikedCard()) {
    this._buttonLike.classList.add('element__like_active');
  } else {
    this._buttonLike.classList.remove('element__like_active');
  }
}

};

