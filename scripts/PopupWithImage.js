import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
    constructor(Popupselector){
        super(Popupselector)
        this._popupImg = document.querySelector('.popup__image'); 
        this._popupImgCaption = document.querySelector('.popup__img-caption');
    }

    open(name, link) {
        super.open();
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupImgCaption.textContent = name;
      };
}