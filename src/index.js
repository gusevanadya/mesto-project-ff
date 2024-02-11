import './pages/index.css';
import {createCard, addCard, removeCard, changeLike, itemRemove} from './components/card.js';
import {openModal, closeModal} from './components/modals.js'
import {enableValidation, clearValidation} from './components/validation.js'
import {getInitialCards, getUserData, editProfileData, changeAvatar, addLike, removeLike, addNewCard, removeCardFromServer} from './components/api.js'

//API
let userId;
Promise.all([getUserData(), getInitialCards()])
  .then(function([userData, initialCards]) {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    initialCards.forEach(function(item) {
      const createdCard = createCard(item, {
        removeCard,
        handleImageClick,
        handleLikeCard,
        handleDeleteCard,
        closeModal,
        openModal,
        userId
      });
      addCard(placesList, createdCard);
    })
  })
  .catch(function(err) {
    console.log(err); 
  })
  
//объект для валидации форм
const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(formObject);

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

//изменение кнопки попапа
function changeButton(button) {
  button.textContent = 'Сохранение...';
}

// редактирование профиля
  //константы
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const buttonProfileFormSubmit = profileForm.querySelector(`${formObject.submitButtonSelector}`)
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image');
  //обработка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;
  editProfileData(name, about)
    .then(function(data) {
      console.log('Данные обновлены');
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      changeButton(buttonProfileFormSubmit);
      buttonProfileFormSubmit.classList.add(formObject.inactiveButtonClass); 
    })
  closeModal(popupTypeEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit); 
  //попап
  buttonProfileEdit.addEventListener('click', function(){
  clearValidation(profileForm, formObject);
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  profileForm.querySelector(`${formObject.submitButtonSelector}`).textContent = 'Сохранить'
});

//редактирование аватара
  //константы 
const buttonOpenPopupAvatar = document.querySelector('.profile__image-layout');
const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['new-avatar'];
const avatarButton = avatarForm.querySelector(`${formObject.submitButtonSelector}`)
const avatarLinkInput = avatarForm.link;
 //попап
 buttonOpenPopupAvatar.addEventListener('click', function() {
  openModal(popupTypeAvatar);
  avatarLinkInput.value = '';
  avatarForm.querySelector(`${formObject.submitButtonSelector}`).textContent = 'Сохранить'
});
popupTypeAvatar.querySelector('.popup__close').addEventListener('click', function() {
  closeModal(popupTypeAvatar); 
  clearValidation(formObject, avatarForm);
});
  //обработка формы
function changeAvatarElement(link) {
  profileAvatar.style.backgroundImage = `url('${link}')`;
}
avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const link = avatarLinkInput.value;
  changeAvatar(link)
    .then(function(link) {
      const newAva = link.avatar;
      changeAvatarElement(newAva);
      console.log('Аватар обновлен');
      closeModal(popupTypeAvatar);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      changeButton(avatarButton);
      avatarButton.classList.add(formObject.inactiveButtonClass); 
    })
});

// добавление карточки
  //константы
const buttonAddNewCard = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm['place-name'];
const linkInput = addCardForm.link;
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const imagePopupTypeImage = popupTypeImage.querySelector('.popup__image');
const captionPopupTypeImage = popupTypeImage.querySelector('.popup__caption');
  //обработка формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const buttonElement = addCardForm.querySelector(formObject.submitButtonSelector);
  const item = {};
  item.name = placeNameInput.value;
  item.link = linkInput.value;
  changeButton(buttonElement);
  addNewCard(item)
    .then(function(item) {
      const createdCard = createCard(item,{
        removeCard,
        openModal,
        handleImageClick,
        handleLikeCard,
        handleDeleteCard,
        userId
      });
      placesList.prepend(createdCard);
      addCardForm.reset();
      clearValidation(addCardForm, formObject);
      closeModal(popupTypeNewCard);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      buttonElement.classList.add(formObject.inactiveButtonClass);
      buttonElement.textContent = 'Создать'
    })
}
addCardForm.addEventListener('submit', handleCardFormSubmit);
  //попап
  buttonAddNewCard.addEventListener('click', function(){
  openModal(popupTypeNewCard); 
});
//попап карточки
function handleImageClick(event){
  openModal(popupTypeImage);
  imagePopupTypeImage.src = event.target.src;
  imagePopupTypeImage.alt = event.target.alt;
  captionPopupTypeImage.textContent = event.target.alt;
}
  //удаление карточки
const popupTypeDelete = document.querySelector('.popup_type_delete');
const buttonConfirmRemoving = popupTypeDelete.querySelector('.popup_type_delete-button');
function handleDeleteCard(cardId, cardElement) {
  buttonConfirmRemoving.addEventListener('click', function() {
    removeCardFromServer(cardId)
      .then(function() {
        removeCard(cardElement);
        closeModal(popupTypeDelete);      
      })
      .catch(function(err) {
        console.log(err)
      })
  })
}

  //лайк карточки
function handleLikeCard(likeStatus, cardId, likeButton, likeCounter) { 
  if (likeStatus) {
    removeLike(cardId, likeButton, likeCounter)
      .then(function(card) {
        changeLike(card, likeButton, likeCounter);
      })
      .catch(function(err) {
        console.log(err)
      })
  }
  else {
    addLike(cardId, likeButton, likeCounter)
      .then(function(card) {
        changeLike(card, likeButton, likeCounter);
      })
      .catch(function(err) {
        console.log(err)
      })
  };
}