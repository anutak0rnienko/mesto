import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(selector, { handleFormSubmit }) {
        super(selector);
        this._form = this._popup.querySelector(".popup__form");
        this._popupInput = this._form.querySelectorAll(".popup__input");
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._form.querySelector(".popup__button");
        this._submitButtonSave = this._submitButton.textContent;
    }

    _inputValues() {
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
            this._handleFormSubmit(this._inputValues());
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = this._submitButtonSave;
        }
    }
}
