
// // собираем форму 
//   const formEdit = document.forms.form
//   const formEditFields = Array.from(formEdit.querySelectorAll('.popup__input'));
//   const buttonSbmForm = formEdit.querySelector('.popup__button');

// // formEditFields.forEach((elementField) => {
// // const formError = formEdit.querySelector(`#${elementField.id} + .popup__form-error`);
// // elementField.addEventListener('input', (evt) => {
// //     const field = evt.target;
// //     checkFieldValidity(field, formError)

// //     const formIsValid = formEditFields.every(({validity}) => validity.valid);
// //     if (formIsValid) {
// //         enableSbmButton();
// //     } else {
// //         disableSbmButton();
// //     }   
// //     });
// // });

// function enableSbmButton() {
//     buttonSbmForm.removeAttribute('disabled');
//     buttonSbmForm.classList.remove('popup__button_disabled');
    
// };

// function disableSbmButton() {
//     buttonSbmForm.setAttribute('disabled', 'disabled');
//     buttonSbmForm.classList.add('popup__button_disabled');
    
// };

// function checkFieldValidity(field, formError) {
//     const fieldValid = field.validity.valid;
//     formError.textContent = field.validationMessage;

//     if (!fieldValid) {
//         field.classList.add('popup__input_form_invalid');
//     }
//     else {
//         field.classList.remove('popup__input_form_invalid');
//     }
// };





  const enableValidationForm = ({
    formSelector, 
    inputSelector, 
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass}) => {
        const forms = document.querySelectorAll(formSelector)
        forms.forEach((elementForm) => {
            const inputs = Array.from(elementForm.querySelectorAll(inputSelector));
            const button = elementForm.querySelectorAll(submitButtonSelector);
            elementForm.addEventListener('submit', handleFormSubmit);
            inputs.forEach((input) => {
                input.addEventListener('input', (evt) => {
                    const field = evt.target;
                    const formError = elementForm.querySelector(`.popup__form-error-${field.name}`);
                    const fieldValid = field.validity.valid;
                    formError.textContent = field.validationMessage;

                    if (!fieldValid) {
                    field.classList.add('popup__input_form_invalid');
                    }
                    else {
                    field.classList.remove('popup__input_form_invalid');
                    }
                    const buttonState = hasInvalidInput(inputs);
                    
                    toggleSbmBtn (button, inactiveButtonClass, buttonState); 
                    
                })
            })
        })
    }


    const formEdit = document.querySelector('.popup__form')
    const buttonSbmForm = formEdit.querySelector('.popup__button');

      function enableSbmButton() {
        buttonSbmForm.removeAttribute('disabled');
        buttonSbmForm.classList.remove('popup__button_disabled');
            
        };
        
        function disableSbmButton() {
            buttonSbmForm.setAttribute('disabled', 'disabled');
            buttonSbmForm.classList.add('popup__button_disabled');
            
        };
      
      const toggleSbmBtn = (button, inactiveButtonClass, buttonState) => {
        if (buttonState) {
          disableSbmButton(button, inactiveButtonClass)
        }
        else {
          enableSbmButton(button, inactiveButtonClass)
        }
      }


      const hasInvalidInput = (inputs) => {
        return inputs.some((input) => !input.validity.valid)
      }

   

    const handleFormSubmit =(evt) => {
        evt.preventDefault()
        }
        
    const validationConfig = enableValidationForm({
        formSelector: 'form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_form_invalid '
      });   



 

