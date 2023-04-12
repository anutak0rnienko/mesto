import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, apiConfig } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {nameInput, jobInput} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import './index.css'; 

const popupEditOpen = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector('.profile__add-button');
const popupAvatarButton = document.querySelector('.profile__avatar-button');
const cardForm = document.forms['card-form'];
const formValidation = document.forms['form'];


//cоздание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', () => {
    popupImage.open(cardData);
  });
    return card.createCardElement();
};

const cardSection = new Section({renderer: (card) => {
  cardSection.addItem(createCard(card))}}, '.elements');
  cardSection.renderСards(initialCards);

//Валидация
const validationFormEdit = new FormValidator(validationConfig, formValidation);
validationFormEdit.enableValidationForm();

const validationFormAdd = new FormValidator(validationConfig, cardForm);
validationFormAdd.enableValidationForm();

//создание изображения
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const userInfo = new UserInfo({elementUserName: '.profile__name', elementUserJob: '.profile__text', elementUserAvatar: '.profile__avatar-image'});

//Слушатели событий//
//реждактирование профиля 

const popupForm = new PopupWithForm('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  userInfo.setUserInfo(data);
}});

popupForm.setEventListeners();

popupEditOpen.addEventListener("click", () => { 
  popupForm.open();
  validationFormEdit.resetValidaionForm();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
});

//редактирование карточки - добавление 
const popupCard = new PopupWithForm('.popup_type_add-place', {
  handleFormSubmit: ({ image, title }) => {
    cardSection.addItem(createCard({name: title, link: image, alt: title,}))}
});

popupCard.setEventListeners();

popupBtnAdd.addEventListener('click', () => {
  popupCard.open()
  validationFormAdd.resetValidaionForm();
});

const popupFormDelete = new PopupWithDelete('.popup_type_delete', {
  handleFormSubmit: (cardElement, cardId) =>{ apiConnect.handleCardDelete(cardId)
  .then(() => {
    cardElement.handleCardDelete();
    popupFormDelete.close();
  })
  .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
}
});

// popupFormDelete.setEventListeners();

const api = new Api(apiConfig);

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
.then(([userData, cards]) => {
  const { name, about, avatar, _id } = userData;
  cardSection.setItem(cards);
  cardSection.renderСards();
  userInfo.setUserId(_id);
  userInfo.setUserInfo({ name, about });
  userInfo.setUserAvatar({ avatar });
}).catch((err) => alert(err));

popupAvatarButton.addEventListener('click', () => {
  popupFormWithAvatar.open();
})

const popupFormWithAvatar = new PopupWithForm('.popup_type_avatar', {
  // popupFormWithAvatar.renderLoading(true)
  handleFormSubmit: (data) => { 
    api.editProfileAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res)
      popupFormWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
  })
    // .finally(() => popupFormWithAvatar.renderLoading(false));
}})

  const popupWithDelete = document.querySelector('.element__delete');
  popupWithDelete.addEventListener('click', () => {
    popupFormDelete.open();
  })

popupFormWithAvatar.setEventListeners();

