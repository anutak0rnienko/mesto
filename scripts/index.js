let popupBtnOpen = document.querySelector(".profile__edit-button");
let popupContainer = document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let name = document.querySelector('.profile__name');
let text = document.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_user_name");
let jobInput = document.querySelector(".popup__input_user_job"); 
let popupBtn = document.querySelector('.popup__button');

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
    popup.classList.toggle('popup_opened');
}

//Слушатели событий//

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
formElement.addEventListener('submit', handleFormSubmit); 