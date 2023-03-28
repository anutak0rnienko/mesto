import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";
import { validationConfig } from "./constants.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {nameInput, jobInput} from './constants.js';

const popupEditOpen = document.querySelector(".profile__edit-button");
const popupEditContainer = document.querySelector(".popup_type_edit-profile");
const popupEditClose = document.querySelector(".popup__close_edit");
const popupEditName = document.querySelector('.profile__name');
const popupEditText = document.querySelector('.profile__text'); 
const popupBtnAdd = document.querySelector('.profile__add-button');
const popupAddition = document.querySelector('.popup_type_add-place');
const popupBtnMesto = document.querySelector('.popup__close_mesto');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupBtnImage = document.querySelector('.popup__close_button_image');
const templateCard = document.querySelector('#card-template').content.querySelector('.element');
const templateSelector = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.elements');
const elementTitle = document.querySelector('.popup__input_mesto_title');
const elementImage = document.querySelector('.popup__input_mesto_image');
const popupImg = document.querySelector('.popup__image'); 
const popupImgCaption = document.querySelector('.popup__img-caption');
const cardForm = document.forms['card-form'];
const formValidation = document.forms['form'];

//cоздание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '#card-template', () => {
    popupImage.open(cardData);
  });
    return card.createCardElement(); //!!!!
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
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
});

//редактирование карточки - добавление 
const popupCard = new PopupWithForm('.popup_type_add-place', {
  handleFormSubmit: ({ image, title }) => {
    cardSection.addItem(createCard({name: title, link: image, alt: title,}))}
});

popupCard.setEventListeners();

popupBtnAdd.addEventListener('click', () => {
  popupCard.open()
});
// popupAddition.addEventListener('submit', handleFormSubmitCard);

