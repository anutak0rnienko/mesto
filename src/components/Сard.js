export default class Card {
    constructor(
        {
            data,
            template,
            handleImgOpen,
            handleCardLike,
            handleCardDeleteLike,
            handleDeleteCard,
        },
        userId
    ) {
        this.cardId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleImgOpen = handleImgOpen;
        this._myId = data.owner._id;
        this._likesArr = data.likes;
        this._putLike = handleCardLike;
        this._deleteLike = handleCardDeleteLike;
        this._handleDeleteCard = handleDeleteCard;
        this._cardData = data;
        this._userId = userId;
    }

    _getCardTemplate() {
        this._element = document
            .querySelector(this._template)
            .content.querySelector(".element")
            .cloneNode(true);
        return this._element;
    }

    getCardId() {
        return this.cardId;
    }

    createCardElement() {
        this._element = this._getCardTemplate();
        this._cardText = this._element.querySelector(".element__text");
        this._cardText.textContent = this._name;
        this._cardImg = this._element.querySelector(".element__image");
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._buttonLike = this._element.querySelector(".element__like");
        this._buttonDelete = this._element.querySelector(".element__delete");
        this._counterLikes = this._element.querySelector(".element__numberlike");
        this.updatesLikes(this._cardData);
        this.checkCardDelete();
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener("click", () => this.setLikes());
        this._buttonDelete.addEventListener("click", () =>
            this._handleDeleteCard(this, this.cardId)
        );
        this._cardImg.addEventListener("click", () =>
            this._handleImgOpen({
                name: this._name,
                link: this._link,
            })
        );
    }

    // Проверка наличия значка корзины
    checkCardDelete() {
        if (this._myId !== this._userId) {
            this._buttonDelete.remove();
        }
    }

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

    //Наличиe лайка на карточке
    _checklikedCard(cardLikes) {
        return cardLikes.some((like) => like._id === this._userId);
    }

    //Изменение и установка снятия лайка
    setLikes() {
        if (this._checklikedCard(this._likesArr)) {
            this._deleteLike(this.cardId);
        } else {
            this._putLike(this.cardId);
        }
    }

    // Отображение лайков и их колличества
    updatesLikes(card) {
        this._likesArr = card.likes;
        if (this._checklikedCard(card.likes)) {
            this._buttonLike.classList.add("element__like_active");
        } else {
            this._buttonLike.classList.remove("element__like_active");
        }
        this._counterLikes.textContent = this._likesArr.length;
    }
};
