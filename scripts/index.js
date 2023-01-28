let popupBtnOpen = document.querySelector(".profile__edit-button");
let popupContainer = document.querySelector(".popup");
let popupBtnClose = document.querySelector(".popup__close");
let name = document.querySelector('.profile__name');
let text = document.querySelector('.profile__text');
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_user_name");
let jobInput = document.querySelector(".popup__input_user_job"); 
let popupBtnAdd = document.querySelector('.profile__add-button');
let popupAddition = document.querySelector('.popup__addition');
const popupBtnMesto = document.querySelector('.popup__close_mesto');

//открытие и закрытие попапов//

function openPopup() {
    popupContainer.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = text.textContent;
}
function closePopup() {
    popupContainer.classList.remove("popup_opened");
}

function openPopupAdd() {
    popupAddition.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = text.textContent;
};

function closePopupAdd() {
    popupAddition.classList.remove("popup_opened");
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
popupBtnAdd.addEventListener('click', openPopupAdd);
popupBtnMesto.addEventListener("click", closePopupAdd);



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  const template = document.querySelector('#popup-template').content.querySelector('.element');
  const elements = document.querySelector('.elements');
  const elementBtn = document.querySelector('.popup__button_mesto');
  const elementTitle = document.querySelector('.popup__input_mesto_title');
  const elementImage = document.querySelector('.popup__input_mesto_image');
  

  function rendercards() {
    initialCards.forEach((item) => {
        const card = template.cloneNode(true); //копия карточки 
        card.querySelector('.element__text').textContent = item.name;
        card.querySelector('.element__image').src = item.link;
        elements.append(card)
    })
  }
  rendercards()

  //обработчик на второй попап//
  elementBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    title = elementTitle.value;
    image = elementImage.value;
    const card = template.cloneNode(true); //копия карточки 
        card.querySelector('.element__text').textContent = title;
        card.querySelector('.element__image').src = image;
        elements.prepend(card)
        closePopupAdd()
  })

  //удаление карточки надо куда-то вставить в функцию//
  /*card.querySelector('.element__delete').addEventListener(() => {
    card.remove()
})*/