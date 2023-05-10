import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupselector) {
        super(popupselector);
        this._popupImg = this._popup.querySelector(".popup__image");
        this._popupImgCaption = this._popup.querySelector(".popup__img-caption");
    }
    open(item) {
        super.open();
        this._popupImg.src = item.link;
        this._popupImg.alt = item.name;
        this._popupImgCaption.textContent = item.name;
    }
};