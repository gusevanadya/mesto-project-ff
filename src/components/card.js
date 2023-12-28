import {openModal} from './modals.js'

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const imagePopupTypeImage = popupTypeImage.querySelector('.popup__image');
const captionPopupTypeImage = popupTypeImage.querySelector('.popup__caption');

//удаление карточки
function removeCard(event) {
  const itemRemove = event.target.closest('.card');
  itemRemove.remove();
}

//лайк карточки
function likeCard(event) {
  const likeButton = event.target.closest('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

//попап карточки
function handleImageClick(event){
  openModal(popupTypeImage);
  imagePopupTypeImage.src = event.target.src;
  imagePopupTypeImage.alt = event.target.alt;
  captionPopupTypeImage.textContent = event.target.alt;
}

//создание карточки
function createCard(item, removeCard, likeCard, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  deleteButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', handleImageClick)
  return cardElement;
}

//добавление созданной карточки на страницу
function addCard(createdCard) {
  placesList.append(createdCard);
} 

export {createCard, addCard, removeCard, likeCard, handleImageClick}