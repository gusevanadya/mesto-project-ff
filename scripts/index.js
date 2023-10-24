const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function removeCard(event) {
  const itemRemove = event.target.closest('.card');
  itemRemove.remove();
}

function createCard(item, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;
  deleteButton.addEventListener('click', removeCard);
  return cardElement;
}

function addCard(createdCard) {
  placesList.append(createdCard);
} 

initialCards.forEach(function(item) {
  const createdCard = createCard(item, removeCard);
  addCard(createdCard);
})