import {openModal} from './modals.js'

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

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
function popupCard(event){
  const modalDOM = document.querySelector('.popup_type_image');
  openModal(modalDOM);
  modalDOM.querySelector('.popup__image').src = event.target.src;
  modalDOM.querySelector('.popup__image').alt = event.target.alt;
  modalDOM.querySelector('.popup__caption').textContent = event.target.alt;
}

//создание карточки
function createCard(item) {
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
  cardImage.addEventListener('click', popupCard)
  return cardElement;
}

//добавление созданной карточки на страницу
function addCard(createdCard) {
  placesList.append(createdCard);
} 

export {createCard, addCard}