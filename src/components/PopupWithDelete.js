import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(selector, { handleFormSubmit }) {
        super(selector);
        this._elementDelete = document.querySelector('popup__button_mesto');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardObject, cardId) {
        this._cardObject = cardObject;
        this._cardId = cardId;
        super.open();
      } 

      setEventListeners() {
        super.setEventListeners();
        this._elementDelete.addEventListener('submit', () => { 
            this._handleFormSubmit(this.cardObject, this.cardId) })
    }    

    
}