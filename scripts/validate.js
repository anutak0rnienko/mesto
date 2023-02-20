const enableValidationForm = ({
    formSelector, 
    inputSelector, 
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass}) => {
        const forms = document.querySelectorAll(formSelector)
        forms.forEach((elementForm) => {
            const inputs = Array.from(elementForm.querySelectorAll(inputSelector));
            const buttonElement = elementForm.querySelector(submitButtonSelector);
            elementForm.addEventListener('submit', handleFormSubmit);
            inputs.forEach((elementInput) => {
                elementInput.addEventListener('input', (evt) => {
                    const field = evt.target;
                    const formError = elementForm.querySelector(`.popup__form-error-${field.name}`);
                    const fieldValid = field.validity.valid;
                    formError.textContent = field.validationMessage;
                    if (!fieldValid) {
                    field.classList.add(inputErrorClass);
                    }
                    else {
                    field.classList.remove(inputErrorClass);
                    }
                    const buttonForm = hasInvalidInput(inputs);
                    toggleButtonForm(buttonElement, inactiveButtonClass, buttonForm);
                })
            })
        })
    }

function enableSbmButton(buttonElement, inactiveButtonClass) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
};
        
function disableSbmButton(buttonElement, inactiveButtonClass) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
};

const toggleButtonForm = (buttonElement, inactiveButtonClass, buttonForm) => {
    if (buttonForm) {
        disableSbmButton(buttonElement, inactiveButtonClass)
    }
    else {
        enableSbmButton(buttonElement, inactiveButtonClass)
    }
};

const hasInvalidInput = (inputs) => {
    return inputs.some((elementInput) => !elementInput.validity.valid);
};

const handleFormSubmit =(evt) => {
    evt.preventDefault();
};
          
function noActiveButton(buttonElement) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.setAttribute('disabled', true);
};

const validationConfiguration = enableValidationForm({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_form_invalid'
});


