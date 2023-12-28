//функция закрытия черз esc
function closeByEsc(evt){
  const modalItem = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {  
      closeModal(modalItem);
    };  
} 

//функция закрытия черз overlay
function closeByOverlay(evt) {
  const modalItem = document.querySelector(".popup_is-opened");
  if (evt.target === modalItem) {
    closeModal(modalItem);
  }
}

//функция закрытия попапа
function closeModal(modalItem){
  modalItem.classList.remove('popup_is-animated');
  modalItem.classList.remove('popup_is-opened');
  modalItem.style.setProperty('display', 'none');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlay)
}

//функция открытия попапа
function openModal(modalItem){
  modalItem.style.setProperty("display", "flex");
  modalItem.classList.add('popup_is-animated');
  modalItem.classList.add('popup_is-opened');
  const popupCloseButton = modalItem.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', function(){
    closeModal(modalItem);
  });
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closeByOverlay);
}

export {openModal, closeModal}