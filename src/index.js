import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard, addCard} from './components/card';
import {openModal, closeModal} from './components/modals.js'

//вывод объекта initialCards
initialCards.forEach(function(item) {
  const createdCard = createCard(item);
  addCard(createdCard);
})

// редактирование профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
  //обработка формы
function editProfileFormSubmit(evt) {
  const modalDOM = document.querySelector('.popup_type_edit');
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal(modalDOM);
}  
  //попап
editProfileButton.addEventListener('click', function(){
  const modalDOM = document.querySelector('.popup_type_edit');
  openModal(modalDOM);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  profileForm.addEventListener('submit', editProfileFormSubmit); 
});

// добавление карточки
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm['place-name'];
const linkInput = addCardForm.link;
  //обработка формы
function addCardFormSubmit(evt) {
  const modalDOM = document.querySelector('.popup_type_new-card');
  evt.preventDefault();
  const item = {};
  item.name = placeNameInput.value;
  item.link = linkInput.value;
  const createdCard = createCard(item);
  document.querySelector('.places__list').prepend(createdCard);
  addCardForm.reset();
  closeModal(modalDOM);
} 
  //попап
addNewCardButton.addEventListener('click', function(){
  const modalDOM = document.querySelector('.popup_type_new-card');
  openModal(modalDOM); 
  addCardForm.addEventListener('submit', addCardFormSubmit); 
});