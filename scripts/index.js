const popupEditOpen = document.querySelector(".profile__edit-button");
const popupEditContainer = document.querySelector(".popup");
const popupEditClose = document.querySelector(".popup__close");
const popupEditName = document.querySelector('.profile__name');
const popupEditText = document.querySelector('.profile__text');
const formEditElement = document.querySelector(".popup_type_edit-profile");
const nameInput = document.querySelector(".popup__input_user_name");
const jobInput = document.querySelector(".popup__input_user_job"); 
const popupBtnAdd = document.querySelector('.profile__add-button');
const popupAddition = document.querySelector('.popup_type_add-place');
const popupBtnMesto = document.querySelector('.popup__close_mesto');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupBtnImage = document.querySelector('.popup__close_button_image');
const templateCard = document.querySelector('#card-template').content.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
const elementBtn = document.querySelector('.popup__button_mesto');
const elementTitle = document.querySelector('.popup__input_mesto_title');
const elementImage = document.querySelector('.popup__input_mesto_image');
const popupImg = document.querySelector('.popup__image'); 
const popupImgCaption = document.querySelector('.popup__img-caption');
  

//открытие и закрытие попапов//

function openPopup() {
    openAllPopup(popupEditContainer);
    nameInput.value = popupEditName.textContent;
    jobInput.value = popupEditText.textContent;
};

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove("popup_opened");
};

function openPopupAdd() {
    openAllPopup(popupAddition);
    nameInput.value = popupEditName.textContent;
    jobInput.value = popupEditText.textContent;
};


//кнопка сохранить//

// Обработчик «отправки» 
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    popupEditName.textContent = nameInput.value;
    popupEditText.textContent = jobInput.value;
    closePopup(evt);
};

//Слушатели событий//

popupEditOpen.addEventListener("click", openPopup);
popupEditClose.addEventListener("click", closePopup);
formEditElement.addEventListener('submit', handleFormSubmit); 
popupBtnAdd.addEventListener('click', openPopupAdd);
popupBtnMesto.addEventListener("click", closePopup);
popupBtnImage.addEventListener('click', closePopup);



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
  

function renderСards() {
    initialCards.forEach((item) => {
        cardsContainer.append(createCard(item));
    });
};
renderСards();

  //обработчик на второй попап
elementBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
        cardsContainer.prepend(createCard(
            {
             name: elementTitle.value,
             link: elementImage.value
            }
        ));
        closePopup(evt)
});

function createCard(cardData) {
    const card = templateCard.cloneNode(true); //копия карточки 
    card.querySelector('.element__text').textContent = cardData.name;
    card.querySelector('.element__image').src = cardData.link;
    card.querySelector('.element__image').alt = cardData.name;
    card.querySelector('.element__delete').addEventListener('click', HandleCardDelete);
    card.querySelector('.element__like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like_active')) {
            HandleLikeDelete(evt);
        } else {
            HandleLikeClick(evt);
        }
    });
    card.querySelector('.element__image').addEventListener('click', HandleImgOpen);
    return card;  
};

function HandleCardDelete(evt) {
        evt.target.closest('.element').remove();
};

function HandleLikeClick(evt) {
    evt.target.classList.add('element__like_active');
};

 function HandleLikeDelete(evt) {
    evt.target.classList.toggle('element__like_active');
};

function HandleImgOpen(evt) {
    openAllPopup(popupTypeImg);
    popupImg.src = evt.target.src;
    popupImgCaption.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
};

function openAllPopup(elem) {
    elem.classList.add("popup_opened");
};