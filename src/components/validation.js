//отображение сообщения об ошибке
function showInputError (formElement, inputElement, validationMessage, formObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(formObject.errorClass);
};

//скрытие сообщения об ошибке
function hideInputError (formElement, inputElement, formObject) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass)
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

//проверка валидности поля ввода
function checkInputValidity(formElement, inputElement, formObject){
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

//активация кнопки
function toggleButtonState(inputList, buttonElement, formObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass)
  }
  else {
    buttonElement.classList.remove(formObject.inactiveButtonClass)
  }
}

//слушатель ввода текста
function setEventListeners(formElement, formObject) {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObject);
  inputList.forEach(function(inputElement) {
  inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

//включение валидации
function enableValidation(formObject){
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach(function(formElement) {
    formElement.addEventListener('submit', function() {
    //evt.prevent.default;
    });
    setEventListeners(formElement,formObject);
  })
}

function clearValidation(formElement, formObject){
  const inputList = formElement.querySelectorAll(formObject.inputSelector)
  inputList.forEach(function(inputElement) {
    hideInputError (formElement, inputElement, formObject);
  })
};

export {enableValidation, clearValidation}