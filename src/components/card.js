const cardTemplate = document.querySelector('#card-template').content;
const popupTypeDelete = document.querySelector('.popup_type_delete');

//удаление карточки
function removeCard(card) {
  card.remove();
}

//лайк карточки
function changeLike(card, likeButton, likeCounter) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeCounter.textContent = card.likes.length;
}

function checkLikeStatus(likeButton) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  return isLiked;
  }

//создание карточки
function createCard(item, {
  handleImageClick,
  handleLikeCard,
  openModal,
  handleDeleteCard,
  userId
}) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardId = item._id;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardImage.addEventListener('click', handleImageClick);
  likeCounter.textContent = item.likes.length;
  const myLike = item.likes.some(function(like) {
    return like._id === userId;
  });
  if (myLike) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function() {
    const likeStatus = checkLikeStatus(likeButton);
    handleLikeCard(likeStatus, cardId, likeButton, likeCounter)
  });
  if (item.owner._id === userId) {
    deleteButton.addEventListener('click', function(evt) {
      handleDeleteCard(cardId, cardElement);
      openModal(popupTypeDelete); 
    })
  } 
  else {
    deleteButton.style.display = 'none';
  }
  return cardElement;
}

//добавление созданной карточки на страницу
function addCard(placesList, createdCard) {
  placesList.append(createdCard);
} 

export {createCard, addCard, removeCard, changeLike}