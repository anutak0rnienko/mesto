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

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
.then(([user, cards]) => {
  const { name, about, avatar, _id } = user;
  cardSection.setItem(cards);
  cardSection.renderСards();
  userInfo.setUserId(_id);
  userInfo.setUserInfo({ name, about });
  userInfo.setUserAvatar({ avatar });
}).catch((err) => console.log(err));

// cоздание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', () => {
    popupImage.open(cardData);
  },
  (cardId) => {
    api.putCardLike(cardId)
      .then((data) => {
        card.renderCardLike(data);
      })
      .catch((err) => {
        console.error('Error');
      })
  },
  (cardId) => {
    api.deleteCardLike(cardId)
      .then((data) => {
        card.renderCardLike(data);
      })
      .catch((err) => {
        console.error('Error');
      })
    },
    () => {
      popupFormDelete.open(cardData)
    }
  )
    return card.createCardElement();
};
// НОВОЕ
// const createCard = (cardData, user) => {
//   const card = new Card({cardData: cardData, userId: user, template : '#card-template', 
//   handleImgOpen: () => {
//     popupImage.open(cardData);
//   },
//   handleCardLike: (id) => {
//     api.putCardLike(id)
//     .then((res) => {
//       card.renderCardLike(res);
//     })
//     .catch((err) => alert(err))
//   },
//   handleCardDeleteLike: (id) => {
//     api.deleteCardLike(id)
//     .then((res) => {
//       card.renderCardLike(res)
//     })
//     .catch((err) => alert(err))
//   }
// }
//   )
//     return card.createCardElement();
// };

const cardSection = new Section({renderer: (card) => {
  cardSection.addItem(createCard(card))}}, '.elements');
  cardSection.renderСards(initialCards);

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

const userInfo = new UserInfo({elementUserName: '.profile__name', elementUserJob: '.profile__text', elementUserAvatar: '.profile__avatar-image'});

//Слушатели событий//
//реждактирование профиля 

const popupForm = new PopupWithForm('.popup_type_edit-profile', {handleFormSubmit: (data) => {
  popupForm.renderLoading(true)
  api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupForm.renderLoading(false);
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
  const value = { name: item.title, link: item.image };
  popupCard.renderLoading(true);
  api.addCardElements(value)
    .then((data) => {
      cardSection.addItem(createCard(data))
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupCard.renderLoading(false));
}});

popupCard.setEventListeners();

//открытие попап редактирование карточки - добавление
popupBtnAdd.addEventListener('click', () => {
  popupCard.open()
  validationFormAdd.resetValidaionForm();
});

//попап удаление карточки
const popupFormDelete = new PopupWithDelete('.popup_type_delete', {
  handleFormSubmit: (cardObject, cardId) => { 
    popupFormDelete.renderLoading(true);
    api.deleteCard(cardId)
    .then(() => {
      cardObject.deleteCards();
      popupFormDelete.close();
  })
  .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
}
});

//открытие попап удаление карточки
const popupWithDelete = document.querySelector('.element__delete');
popupWithDelete.addEventListener('click', () => {
  popupFormDelete.open();
})

// popupFormDelete.setEventListeners();

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
    .finally(() => popupFormWithAvatar.renderLoading(false));
}}) 

popupFormWithAvatar.setEventListeners();

//открытие попап редактирования аватара
popupAvatarButton.addEventListener('click', () => {
  popupFormWithAvatar.open();
})


