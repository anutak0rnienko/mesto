import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, apiConfig } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {nameInput, jobInput, popupEditOpen, popupBtnAdd, popupAvatarButton, cardForm, formValidation, validationAvatar} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import './index.css'; 

const api = new Api(apiConfig);

const userInfo = new UserInfo({elementUserName: '.profile__name', elementUserJob: '.profile__text', elementUserAvatar: '.profile__avatar-image'});

let userId

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
.then(([user, card]) => {
  userId = user._id;
  userInfo.setUserInfo(user);
  userInfo.setUserAvatar(user);
  cardSection.renderСards(card)
  console.log(userId)
})
.catch((err) => console.log(err));


// cоздание карточки
const createCard = (data) => {
  const card = new Card({data: data, template: '#card-template', 
  handleImgOpen: () => {
    popupImage.open(data);
  }, 
 handleCardLike: (cardId) => {
    api.putCardLike(cardId)
    .then((res) => {
      card.updatesLikes(res);
    })
    .catch((err) => console.log(err))
  },
  handleCardDeleteLike: (cardId) => {
    api.deleteCardLike(cardId)
    .then((res) => {
      card.updatesLikes(res)
    })
    .catch((err) => console.log(err))
  },handleDeleteCard: (cardID, cardElement) => {
    popupFormDelete.open(cardID, cardElement);
  }}, userId)
    return card.createCardElement();
};

const cardSection = new Section({renderer: (card) => {
  cardSection.addItem(createCard(card))}}, '.elements');
  // cardSection.renderСards(initialCards);


//Валидация
const validationFormEdit = new FormValidator(validationConfig, formValidation);
validationFormEdit.enableValidationForm();

const validationFormAdd = new FormValidator(validationConfig, cardForm);
validationFormAdd.enableValidationForm();

const validationFormAvatar = new FormValidator(validationConfig, validationAvatar);
validationFormAvatar.enableValidationForm();

//создание изображения
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();


//Слушатели событий//
//реждактирование профиля 

const popupForm = new PopupWithForm('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  popupForm.renderLoading(true)
  api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupForm.renderLoading(false);
      popupForm.close();
    })
}});

popupForm.setEventListeners();

//открытие попап редактирование профиля
popupEditOpen.addEventListener("click", () => { 
  popupForm.open();
  validationFormEdit.resetValidaionForm();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
});

//редактирование карточки - добавление 
const popupCard = new PopupWithForm('.popup_type_add-place', {handleFormSubmit:(item) => {
  popupCard.renderLoading(true)
  const value = { name: item.title, link: item.image };
  api.addCardElements(value)
    .then((data) => {
      cardSection.addItem(createCard(data))
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => { popupCard.renderLoading(false)});
}});

popupCard.setEventListeners();

//открытие попап редактирование карточки - добавление
popupBtnAdd.addEventListener('click', () => {
  popupCard.open()
  validationFormAdd.resetValidaionForm();
});

//попап удаление карточки
// const popupFormDelete = new PopupWithDelete('.popup_type_delete');
const popupFormDelete = new PopupWithDelete('.popup_type_delete', {
  handleFormSubmit: (id, card) => {
    popupFormDelete.renderLoading(true);
    api.deleteCard(id)
    .then(() => {
      card.deleteElement();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormDelete.renderLoading(false);
    })
  }
})
popupFormDelete.setEventListeners();

//редактирование аватара
const popupFormWithAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => { 
    popupFormWithAvatar.renderLoading(true);
    api.editProfileAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res)
      popupFormWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
  })
    .finally(() => {popupFormWithAvatar.renderLoading(false)});
}}) 

popupFormWithAvatar.setEventListeners();

//открытие попап редактирования аватара
popupAvatarButton.addEventListener('click', () => {
  popupFormWithAvatar.open();
})



