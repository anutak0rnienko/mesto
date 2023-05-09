import Popup from './Popup.js';
export default class PopupWithDelete extends Popup {
    constructor(selector, {handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    open(cardElement, idCard) {
        super.open();
        this.id = idCard;
        this.card = cardElement;
      }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('submit', () => { 
            this._handleFormSubmit(this.id, this.card) })
    }       
}