const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardName = initialCards.map(function (item) {
  return item.name;
}); 

const cardLink = initialCards.map(function (item) {
  return item.link;
}); 

function removeCard(event) {
  const itemRemove = event.target.closest('.card');
  itemRemove.remove();
}

function addCard(cardValue) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = cardValue.split('*')[0];
  cardElement.querySelector('.card__image').alt = cardValue.split('*')[0];
  cardElement.querySelector('.card__image').src = cardValue.split('*')[1];
  placesList.append(cardElement);
  deleteButton.addEventListener('click', removeCard);
};

for (let i = 0; i < cardName.length; i++) {
  let cardValue = cardName[i] + '*' + cardLink[i];
  addCard(cardValue);
}  