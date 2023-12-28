//функция закрытия черз esc
function closeByEsc(evt){
  if (evt.key === 'Escape') {
    const modalItem = document.querySelector('.popup_is-opened'); 
    closeModal(modalItem);
  };  
} 

//функция закрытия попапа
function closeModal(modalItem){
  modalItem.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

//функция открытия попапа
function openModal(modalItem){
  modalItem.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

export {openModal, closeModal}