import Popup from './Popup.js';
export default class PopupWithDelete extends Popup {
    constructor(selector, {handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._submitButtonSave = this._submitButton.textContent;
    }

    openPopupDelete(cardElement, idCard) {
        super.open();
        this.id = idCard;
        this.card = cardElement;
      }

      renderLoading(isLoading) {
        if (isLoading) {
          this._submitButton.textContent = 'Сохранение...'
        } else {
          this._submitButton.textContent = this._submitButtonSave;
        }
      }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => { 
            this._handleFormSubmit(this.id, this.card) })
    }       
}