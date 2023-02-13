
// собираем форму 
  const formEdit = document.forms.form
  const formEditFields = Array.from(formEdit.querySelectorAll('.popup__input'));
  const buttonSbmForm = formEdit.querySelector('.popup__button');

formEditFields.forEach((elementField) => {
const formError = formEdit.querySelector(`#${elementField.id} + .popup__form-error`);
elementField.addEventListener('input', (evt) => {
    const field = evt.target;
    checkFieldValidity(field, formError)

    const formIsValid = formEditFields.every(({validity}) => validity.valid);
    if (formIsValid) {
        enableSbmButton();
    } else {
        disableSbmButton();
    }   
    });
});

function enableSbmButton() {
    buttonSbmForm.removeAttribute('disabled');
    buttonSbmForm.classList.remove('popup__button_disabled');
    
};

function disableSbmButton() {
    buttonSbmForm.setAttribute('disabled', 'disabled');
    buttonSbmForm.classList.add('popup__button_disabled');
    
};

function checkFieldValidity(field, formError) {
    const fieldValid = field.validity.valid;
    formError.textContent = field.validationMessage;

    if (!fieldValid) {
        field.classList.add('popup__input_form_invalid');
    }
    else {
        field.classList.remove('popup__input_form_invalid');
    }
};





//   const enableValidation = ({
//     formSelector, 
//     inputSelector, 
//     inputErrorClass, 
//     submitButtonSelector,
//     inactiveButtonClass}) => {
//         const formEditFields = Array.from(formEdit.querySelectorAll('.popup__input'));
//         formEditFields.forEach((elementField) => {
//             const formError = formEdit.querySelector(`#${elementField.id} + .popup__form-error`);
//             elementField.addEventListener('input', (evt) => {
//                 const field = evt.target;
//                 checkFieldValidity(field, formError)
            
//                 const formIsValid = formEditFields.every(({validity}) => validity.valid);
//                 if (formIsValid) {
//                     enableSbmButton();
//                 } else {
//                     disableSbmButton();
//                 }   
//                 });
//             });
//     }

//     const validationConfig = enableValidation({
//         formSelector: 'form',
//         inputSelector: '.popup__input',
//         inputErrorClass: 'popup__input_form_invalid ',
//         submitButtonSelector: '.popup__button',
//         inactiveButtonClass: 'popup__button_disabled'
//       });



 

