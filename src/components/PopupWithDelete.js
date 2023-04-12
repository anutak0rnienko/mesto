import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(selector, { handleSubmitCallback }) {
        super(selector);
        this._elementDelete = document.querySelector('popup__button_mesto');
        this._handleSubmitCallback = handleSubmitCallback;
    }

    open(cardObject, cardId) {
        this._cardObject = cardObject;
        this._cardId = cardId;
        super.open();
      }

      setEventListeners() {
        this._elementDelete.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
            this._handleSubmitCallback(this._cardObject, this._cardId) })
        super.setEventListeners();
    }    
}