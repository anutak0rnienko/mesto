export default class FormValidator {
    constructor(config, elementForm) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._elementForm = elementForm;
        this._buttonElement = this._elementForm.querySelector(this._submitButtonSelector);
        this._inputs = Array.from(this._elementForm.querySelectorAll(this._inputSelector));
    }

    _enableSbmButton() {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    _disableSbmButton() {
        this._buttonElement.setAttribute("disabled", true);
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    _toggleButtonForm() {
        if (this._hasInvalidInput()) {
            this._disableSbmButton();
        } else {
            this._enableSbmButton();
        }
    }

    _hasInvalidInput() {
        return this._inputs.some(
            (elementInput) => !elementInput.validity.valid
        );
    }

    _checkInputValidity = (elementInput) => {
        const formError = this._elementForm.querySelector(`.popup__form-error-${elementInput.name}`);
        if (elementInput.validity.valid) {
            elementInput.classList.remove(this._inputErrorClass);
            formError.textContent = "";
        } else {
            elementInput.classList.add(this._inputErrorClass);
            formError.textContent = elementInput.validationMessage;
        }
    };

    enableValidationForm() {
        this._toggleButtonForm();
        this._elementForm.addEventListener("reset", () => {
            this._disableSbmButton();
        });
        this._inputs.forEach((elementInput) => {
            elementInput.addEventListener("input", () => {
                this._checkInputValidity(elementInput);
                this._toggleButtonForm();
            });
        });
    }

    resetValidaionForm() {
        this._toggleButtonForm();
        this._inputs.forEach((elementInput) => {
            const formError = this._elementForm.querySelector(`.popup__form-error-${elementInput.name}`);
            elementInput.classList.remove(this._inputErrorClass);
            formError.textContent = "";
        });
    }
};
