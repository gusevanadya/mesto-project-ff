import {closeModal, openModal} from './modals.js'
import {addLike, removeLike, removeCardFromServer } from './api.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const imagePopupTypeImage = popupTypeImage.querySelector('.popup__image');
const captionPopupTypeImage = popupTypeImage.querySelector('.popup__caption');
const popupTypeDelete = document.querySelector('.popup_type_delete');
let itemRemove;
let cardId;

//удаление карточки
function removeCard() {
  removeCardFromServer(cardId)
    .then(function() {
      itemRemove.remove();
      closeModal(popupTypeDelete);
    })
    .catch(function(err) {
      console.error(err);
    });
}

//лайк карточки
function likeCard(event, cardId, likeButton, likeCounter) {
  const likedCard = event.target.classList.contains('card__like-button_is-active');
  if (likedCard) {
    removeLike(cardId, likeButton, likeCounter)
      .then(function(newCard) {       
        likeCounter.textContent = newCard.likes.length;
        event.target.classList.remove('card__like-button_is-active');
      })
      .catch(function(err) {
        console.log(err);
      });
  } 
  else {
    addLike(cardId, likeButton, likeCounter)
      .then(function(newCard) {
        likeCounter.textContent = newCard.likes.length;
        event.target.classList.add('card__like-button_is-active');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

//попап карточки
function handleImageClick(event){
  openModal(popupTypeImage);
  imagePopupTypeImage.src = event.target.src;
  imagePopupTypeImage.alt = event.target.alt;
  captionPopupTypeImage.textContent = event.target.alt;
}

//создание карточки
function createCard(item, {
  removeCard,
  likeCard,
  handleImageClick,
  UserId
}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', handleImageClick);
  deleteButton.addEventListener('click', removeCard);
  if (item.owner._id === UserId) {
    deleteButton.addEventListener('click', function(evt) {
      openModal(popupTypeDelete);
      itemRemove = evt.target.closest('.card');
      cardId = item._id;
    });
  } 
  else {
    deleteButton.style.display = 'none';
  }
  likeCounter.textContent = item.likes.length;
  const myLike = item.likes.some(function(like) {
    return like._id === UserId;
  });
  if (myLike) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function(event) {
    const cardId = item._id;
    likeCard(event, cardId, likeButton, likeCounter);
  });
  return cardElement;
}

//добавление созданной карточки на страницу
function addCard(createdCard) {
  placesList.append(createdCard);
} 

export {createCard, addCard, removeCard, likeCard, handleImageClick, itemRemove}