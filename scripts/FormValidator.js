// const enableValidationForm = ({
//     formSelector, 
//     inputSelector, 
//     submitButtonSelector,
//     inactiveButtonClass,
//     inputErrorClass}) => {
//         const forms = document.querySelectorAll(formSelector)
//         forms.forEach((elementForm) => {
//             const inputs = Array.from(elementForm.querySelectorAll(inputSelector));
//             const buttonElement = elementForm.querySelector(submitButtonSelector);
//             disableSbmButton(buttonElement, inactiveButtonClass);
//             elementForm.addEventListener('reset', () => {
//                 disableSbmButton(buttonElement, inactiveButtonClass);
//             });
//             elementForm.addEventListener('submit', handleFormSubmit);
//             inputs.forEach((elementInput) => {
//                 elementInput.addEventListener('input', (evt) => {
//                     const field = evt.target;
//                     const formError = elementForm.querySelector(`.popup__form-error-${field.name}`);
//                     checkInputValidity(elementInput, formError, inputErrorClass);
//                     const isValid = hasInvalidInput(inputs);
//                     toggleButtonForm(buttonElement, inactiveButtonClass, isValid);
//                 })
//             })
//         })
//     }

// function enableSbmButton(buttonElement, inactiveButtonClass) {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(inactiveButtonClass);
// };
        
// function disableSbmButton(buttonElement, inactiveButtonClass) {
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(inactiveButtonClass);
// };

// const toggleButtonForm = (buttonElement, inactiveButtonClass, isValid) => {
//     if (isValid) {
//         disableSbmButton(buttonElement, inactiveButtonClass);
//     }
//     else {
//         enableSbmButton(buttonElement, inactiveButtonClass);
//     }
// };

// const hasInvalidInput = (inputs) => {
//     return inputs.some((elementInput) => !elementInput.validity.valid);
// };

// const handleFormSubmit =(evt) => {
//     evt.preventDefault();
// };

// const checkInputValidity = (elementInput, formError, inputErrorClass) => { 
//     if (elementInput.validity.valid) {
//         elementInput.classList.remove(inputErrorClass);
//         formError.textContent = '';
//     } else {
//         elementInput.classList.add(inputErrorClass);
//         formError.textContent = elementInput.validationMessage;
//     }
// };

// const validationConfig = enableValidationForm({
//     formSelector: 'form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_form_invalid'
// });
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
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    };
            
    _disableSbmButton() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._inactiveButtonClass);
    };

    _toggleButtonForm() {
        if (this._hasInvalidInput()) {
            this._disableSbmButton();
        }
        else {
            this._enableSbmButton();
        }
    };

    _hasInvalidInput() {
        return this._inputs.some((elementInput) => !elementInput.validity.valid);
    };

    _checkInputValidity = (elementInput) => { 
        const formError = this._elementForm.querySelector(`.popup__form-error-${elementInput.name}`);
            if (elementInput.validity.valid) {
                elementInput.classList.remove(this._inputErrorClass);
                formError.textContent = '';
            } else {
                elementInput.classList.add(this._inputErrorClass);
                formError.textContent = elementInput.validationMessage;
            }
    };

    enableValidationForm() {
        this._toggleButtonForm();
        this._elementForm.addEventListener('reset', () => {
            this._disableSbmButton();
        });
        this._inputs.forEach((elementInput) => {
            elementInput.addEventListener('input', () => {
                this._checkInputValidity(elementInput);
                this._toggleButtonForm();
            })
        })
    }
}
