import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard, addCard, removeCard, likeCard, handleImageClick} from './components/card';
import {openModal, closeModal} from './components/modals.js'

//вывод объекта initialCards
initialCards.forEach(function(item) {
  const createdCard = createCard(item, {
    removeCard,
    likeCard,
    handleImageClick,
  });
  addCard(createdCard);
})

//анимация попапов, закрытие по крестику и оверлею
const popups = document.querySelectorAll('.popup')
popups.forEach(function(popup) {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup)
    }
  })
})

// редактирование профиля
  //константы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')
const popupTypeEdit = document.querySelector('.popup_type_edit');
  //обработка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit); 
  //попап
profileEditButton.addEventListener('click', function(){
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// добавление карточки
  //константы
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm['place-name'];
const linkInput = addCardForm.link;
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');

  //обработка формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.name = placeNameInput.value;
  item.link = linkInput.value;
  const createdCard = createCard(item,{
    removeCard,
    likeCard,
    handleImageClick,
  });
  placesList.prepend(createdCard);
  addCardForm.reset();
  closeModal(popupTypeNewCard);
}
addCardForm.addEventListener('submit', handleCardFormSubmit);
  //попап
addNewCardButton.addEventListener('click', function(){
  openModal(popupTypeNewCard); 
});