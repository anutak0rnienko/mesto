import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, {handleFormSubmit}) {
        super(selectorPopup)
        this._form = this._popup.querySelector('.popup__form');
        this._popupInput = this._form.querySelectorAll('.popup_input');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._valueInput = {};
        this._popupInput.forEach((input) => {
        this._valueInput[input.name] = input.value;
    });
        return this._valueInput;
    }

    close() {
        super.close();
        this._form.reset();
      }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
          });
    }
}