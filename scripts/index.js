const popupEditOpen = document.querySelector(".profile__edit-button");
const popupEditContainer = document.querySelector(".popup_type_edit-profile");
const popupEditClose = document.querySelector(".popup__close_edit");
const popupEditName = document.querySelector('.profile__name');
const popupEditText = document.querySelector('.profile__text');
const nameInput = document.querySelector(".popup__input_user_name");
const jobInput = document.querySelector(".popup__input_user_job"); 
const popupBtnAdd = document.querySelector('.profile__add-button');
const popupAddition = document.querySelector('.popup_type_add-place');
const popupBtnMesto = document.querySelector('.popup__close_mesto');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupBtnImage = document.querySelector('.popup__close_button_image');
const templateCard = document.querySelector('#card-template').content.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
const elementTitle = document.querySelector('.popup__input_mesto_title');
const elementImage = document.querySelector('.popup__input_mesto_image');
const popupImg = document.querySelector('.popup__image'); 
const popupImgCaption = document.querySelector('.popup__img-caption');
const popupBtnMestoInactive = document.querySelector('.popup__button_mesto');
const popupMesto = document.querySelector('.popup__form-mesto');
const popupCntr = document.querySelector('.popup__container_type_image');

  
//открытие и закрытие попапов//
function openPopupEdit() {
  openPopup(popupEditContainer);
  nameInput.value = popupEditName.textContent;
  jobInput.value = popupEditText.textContent;
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", popupKeyHandlerEsc);
};

function closePopupEdit() {
  closePopup(popupEditContainer);
};

function closePopupAdd() {
  closePopup(popupAddition);
};

function closePopupImg() {
  closePopup(popupTypeImg);
};

function openPopupAdd() {
  openPopup(popupAddition);
  nameInput.value = popupEditName.textContent;
  jobInput.value = popupEditText.textContent;
  popupMesto.reset();
  noActiveButton(popupBtnMestoInactive);
};

//кнопка сохранить//
// Обработчик «отправки» 
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  popupEditName.textContent = nameInput.value;
  popupEditText.textContent = jobInput.value;
  closePopup(popupEditContainer);
};

//Слушатели событий//
popupEditOpen.addEventListener("click", openPopupEdit);
popupEditClose.addEventListener("click", closePopupEdit);
popupEditContainer.addEventListener('submit', handleFormSubmitEdit); 
popupBtnAdd.addEventListener('click', openPopupAdd);
popupBtnMesto.addEventListener("click", closePopupAdd);
popupBtnImage.addEventListener('click', closePopupImg);
popupAddition.addEventListener('submit', handleFormSubmitCard);
  
function renderСards() {
  initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });
};
renderСards();

//обработчик на второй попап
function handleFormSubmitCard (evt) {
  evt.preventDefault();
    cardsContainer.prepend(createCard(
      {
        name: elementTitle.value,
        link: elementImage.value
      }
    ));
    closePopup(popupAddition);
};

function createCard(cardData) {
  const card = templateCard.cloneNode(true); //копия карточки 
  const elementCardImg = card.querySelector('.element__image');
  card.querySelector('.element__text').textContent = cardData.name;
  elementCardImg.src = cardData.link;
  elementCardImg.alt = cardData.name;
  card.querySelector('.element__delete').addEventListener('click', handleCardDelete);
  card.querySelector('.element__like').addEventListener('click', handleLikeClick);
  elementCardImg.addEventListener('click', handleImgOpen);
  return card;  
};

function handleCardDelete(evt) {
  evt.target.closest('.element').remove();
};

function handleLikeClick(evt) {
  evt.target.classList.toggle('element__like_active');
};

function handleImgOpen(evt) {
  openPopup(popupTypeImg);
  popupImg.src = evt.target.src;
  popupImgCaption.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", popupKeyHandlerEsc);
};


function popupKeyHandlerEsc(evt) {
  if (evt.key === "Escape") {
    const popupFormOpen = document.querySelector(".popup_opened");
    closePopup(popupFormOpen);
  };
};

popupTypeImg.addEventListener('click', (evt) => {
  if(evt.target === popupTypeImg || evt.target === popupBtnImage) {
    closePopup(popupTypeImg);
  };
});

popupEditContainer.addEventListener('click', (evt) => {
  if(evt.target === popupEditContainer || evt.target === popupEditClose) {
    closePopup(popupEditContainer);
  };
});

popupAddition.addEventListener('click', (evt) => {
  if(evt.target === popupAddition || evt.target === popupBtnMesto) {
    closePopup(popupAddition);
  };
});
