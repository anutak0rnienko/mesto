const popupBtnOpen = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const name = document.querySelector('.profile__name');
const text = document.querySelector('.profile__text');
const formElement = document.querySelector(".popup_type_edit-profile");
const nameInput = document.querySelector(".popup__input_user_name");
const jobInput = document.querySelector(".popup__input_user_job"); 
const popupBtnAdd = document.querySelector('.profile__add-button');
const popupAddition = document.querySelector('.popup_type_add-place');
const popupBtnMesto = document.querySelector('.popup__close_mesto');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupBtnImage = document.querySelector('.popup__close_button_image');
//открытие и закрытие попапов//

function openPopup() {
    popupContainer.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = text.textContent;
}
function closePopup(evt) {
    evt.target.closest('.popup').classList.remove("popup_opened");
}

function openPopupAdd() {
    popupAddition.classList.add("popup_opened");
    nameInput.value = name.textContent;
    jobInput.value = text.textContent;
};


//кнопка сохранить//

// Обработчик «отправки» 
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    name.textContent = nameInput.value;
    text.textContent = jobInput.value;
    closePopup(evt);
}

//Слушатели событий//

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
formElement.addEventListener('submit', handleFormSubmit); 
popupBtnAdd.addEventListener('click', openPopupAdd);
popupBtnMesto.addEventListener("click", closePopup);
popupBtnImage.addEventListener('click', closePopup)



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

  const template = document.querySelector('#card-template').content.querySelector('.element');
  const elements = document.querySelector('.elements');
  const elementBtn = document.querySelector('.popup__button_mesto');
  const elementTitle = document.querySelector('.popup__input_mesto_title');
  const elementImage = document.querySelector('.popup__input_mesto_image');
  

  function rendercards() {
    initialCards.forEach((item) => {
        
        elements.append(createCard(item));
    })

}
  rendercards()

  //обработчик на второй попап
  elementBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
        elements.prepend(createCard(
            {
             name: elementTitle.value,
             link: elementImage.value
            }
        ));
        closePopup(evt)
  });
 

function createCard(item) {
    const card = template.cloneNode(true); //копия карточки 
    card.querySelector('.element__text').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    card.querySelector('.element__like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like_active')) {
            deleteLike(evt);
        } else {
            addLike(evt);
        }
    });
    card.querySelector('.element__image').addEventListener('click', openImg);
    return card;
    
}

function deleteCard(evt) {
        evt.target.closest('.element').remove();
}

function addLike(evt) {
    evt.target.classList.add('element__like_active');
}
 function deleteLike(evt) {
    evt.target.classList.remove('element__like_active');
 }

function openImg(evt) {
    popupTypeImg.classList.add("popup_opened");
    popupImg.src = evt.target.src;
    popupImgCaption.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
}
const popupImg = document.querySelector('.popup__image'); 
const popupImgCaption = document.querySelector('.popup__img-caption');
// const elementText = document.querySelector('.element__text')
