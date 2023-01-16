//открытие и закрытие попапа//

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

//кнопка сохранить//

// Находим форму в DOM
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_username");
let jobInput = document.querySelector(".popup__input_job"); 

let popupBtn = document.querySelector('.popup__button');
popupBtn.addEventListener("click", handleFormSubmit);

// Обработчик «отправки» 
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.

    document.getElementById("nameInput").value;
    document.getElementById("jobInput").value;// Получите значение полей jobInput и nameInput из свойства value

    let name = document.querySelector('.profile__name');
    let text = document.querySelector('.profile__text');// Выберите элементы, куда должны быть вставлены значения полей

    name.textContent = nameInput.value;
    text.textContent = jobInput.value;// Вставьте новые значения с помощью textContent

    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 