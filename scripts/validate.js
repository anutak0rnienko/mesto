

  const enableValidationForm = ({
    formSelector, 
    inputSelector, 
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass}) => {
        const forms = document.querySelectorAll(formSelector)
        forms.forEach((elementForm) => {
            const inputs = Array.from(elementForm.querySelectorAll(inputSelector));
            const buttonElement = elementForm.querySelectorAll(submitButtonSelector);
            elementForm.addEventListener('submit', handleFormSubmit);
            inputs.forEach((input) => {
                input.addEventListener('input', (evt) => {
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
          
                    
                    if (!fieldValid) {
                        enableSbmButton(buttonElement, inactiveButtonClass);
                     }
                    else {
                        enableSbmButton(buttonElement, inactiveButtonClass);
                    }
      
                
                    
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

    const handleFormSubmit =(evt) => {
        evt.preventDefault()
        }  


  const validationConfiguration = enableValidationForm({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_form_invalid'
  });