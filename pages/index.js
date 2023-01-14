let popupBtnOpen = document.querySelector(".profile__edit-button");
let popupContainer = document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
function openPopup() {
    popupContainer.classList.add("popup_opened");
}
function closePopup() {
    popupContainer.classList.remove("popup_opened");
}

let formElement = document.querySelector(".popup__button");
let nameInput = document.querySelector(".popup__input_username")
let jobInput = document.querySelector(".popup__input_job")
function handleFormSubmit (evt) {
    evt.preventDefault();
    console.log('Отправка!');
}
let inputValueName = document.querySelector(".popup__input_username");
console.log(inputValueName.value);
let inputValueJob = document.querySelector(".popup__input_job");
console.log(inputValueJob.value);

