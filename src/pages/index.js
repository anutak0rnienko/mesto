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
import './index.css';

const popupEditOpen = document.querySelector(".profile__edit-button");
const popupBtnAdd = document.querySelector('.profile__add-button');
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

const userInfo = new UserInfo({elementUserName: '.profile__name', elementUserJob: '.profile__text'});

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

const api = new Api(apiConfig);

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
.then(([userData, cards]) => {
  const { name, about, avatar, _id } = userData;
  cardSection.setItem(cards);
  cardSection.renderСards();
  userInfo.setUserId(_id);
  userInfo.setUserInfo({ name, about });
  userInfo.setUserAvatar({ avatar });
}).catch((err) => alert(err))
