import './pages/index.css';
import {createCard, addCard, removeCard, likeCard, handleImageClick, itemRemove} from './components/card.js';
import {openModal, closeModal} from './components/modals.js'
import {enableValidation, clearValidation} from './components/validation.js'
import {getInitialCards, getUserData, editProfileData, changeAvatar,   addNewCard} from './components/api.js'

//API
const promises = [getUserData, getInitialCards];
let UserId;
Promise.all(promises)
  getUserData()
    .then(function(userData) {
      UserId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    });
    getInitialCards()
      .then(function(initialCards) {  
        initialCards.forEach(function(item) {
          const createdCard = createCard(item, {
            removeCard,
            likeCard,
            handleImageClick,
            UserId
          });
          addCard(createdCard);
        })
      })
      .catch(function(err) {
        console.log(err); 
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
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image');
  //обработка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const name = profileTitle.textContent;
  const about = profileDescription.textContent;
  changeButton(profileForm.querySelector(`${formObject.submitButtonSelector}`));
  editProfileData(name, about)
    .then(function(data) {
      console.log('Данные обновлены');
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch(function(err) {
      console.log(err);
    });
  closeModal(popupTypeEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit); 
  //попап
profileEditButton.addEventListener('click', function(){
  clearValidation(profileForm, formObject);
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  profileForm.querySelector(`${formObject.submitButtonSelector}`).textContent = 'Сохранить'
});

//редактирование аватара
  //константы 
const editAvatarButton = document.querySelector('.profile__image-layout');
const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['new-avatar'];
const avatarLinkInput = avatarForm.link;
 //попап
editAvatarButton.addEventListener('click', function() {
  openModal(popupTypeAvatar);
  avatarLinkInput.value = '';
  avatarForm.querySelector(`${formObject.submitButtonSelector}`).textContent = 'Сохранить'
});
popupTypeAvatar.querySelector('.popup__close').addEventListener('click', function() {
  closeModal(popupTypeAvatar); 
  clearValidation(formObject, avatarForm);
});
  //обработка формы
function createAvatarElement(link) {
  profileAvatar.style.backgroundImage = `url('${link}')`;
  return profileAvatar;
}
avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const link = avatarLinkInput.value;
  changeButton(avatarForm.querySelector(`${formObject.submitButtonSelector}`));
  changeAvatar(link)
    .then(function(link) {
      const newAva = link.avatar;
      createAvatarElement(newAva);
      console.log('Аватар обновлен');
      closeModal(popupTypeAvatar);
    })
    .catch(function(err) {
      console.error(err);
    });
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
  const buttonElement = addCardForm.querySelector(formObject.submitButtonSelector);
  const item = {};
  item.name = placeNameInput.value;
  item.link = linkInput.value;
  changeButton(buttonElement);
  addNewCard(item)
    .then(function(item) {
      const createdCard = createCard(item,{
        removeCard,
        likeCard,
        handleImageClick,
        UserId
      });
      placesList.prepend(createdCard);
      addCardForm.reset();
      clearValidation(addCardForm, formObject);
      buttonElement.classList.add(formObject.inactiveButtonClass);  
            closeModal(popupTypeNewCard);
    })
    .catch(function(err) {
      console.error(err);
    });
}
addCardForm.addEventListener('submit', handleCardFormSubmit);
  //попап
addNewCardButton.addEventListener('click', function(){
  openModal(popupTypeNewCard); 
});
  //удаление карточки
  const popupTypeDelete = document.querySelector('.popup_type_delete');
  const confirmRemovingButton = popupTypeDelete.querySelector('.popup_type_delete-button');
  confirmRemovingButton.addEventListener('click', function() {
    removeCard(itemRemove);
    closeModal(popupTypeDelete);
  });
  //лфйк карточки