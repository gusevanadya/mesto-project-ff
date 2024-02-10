const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '099f76ab-e31b-43ed-91a3-e4aee1ee6159',
    'Content-Type': 'application/json'
  }
}

function handleResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
         headers: config.headers
         })
          .then(handleResponse)
} 

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
         headers: config.headers
         })
          .then(handleResponse)
}

function editProfileData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleResponse);
}

function changeAvatar(avaUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avaUrl,
    }),
  }).then(handleResponse);
}

function addNewCard(cardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
    .then(handleResponse);
}

function addLike(cardId, likeButton, likeCounter) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleResponse);
}

function removeLike(cardId, likeButton, likeCounter) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse);
}

function removeCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse);
}

export {getInitialCards, getUserData, editProfileData, changeAvatar,  addNewCard, addLike, removeLike, removeCardFromServer};