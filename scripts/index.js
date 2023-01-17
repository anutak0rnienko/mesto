let popupBtnOpen = document.querySelector(".profile__edit-button");
let popupContainer = document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let name = document.querySelector('.profile__name');
let text = document.querySelector('.profile__text');
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_user_name");
let jobInput = document.querySelector(".popup__input_user_job"); 

//открытие и закрытие попапа//

function openPopup() {
    popupContainer.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = text.textContent;
}
function closePopup() {
    popupContainer.classList.remove("popup_opened");
}

//кнопка сохранить//

// Обработчик «отправки» 
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    name.textContent = nameInput.value;
    text.textContent = jobInput.value;
    closePopup()
}

//Слушатели событий//

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
formElement.addEventListener('submit', handleFormSubmit); 