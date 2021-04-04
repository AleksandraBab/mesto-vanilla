const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = ''
  errorElement.classList.remove(errorClass)
}

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if(inputElement.validity.valid) {
    hideInputError (formElement, inputElement, rest);
  } else {
    showInputError (formElement, inputElement, inputElement.validationMessage, rest);
  }
}

const checkFormValidity = (inputList) => {
  // если невалидна, вернет true
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const setAbleButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disable = false;
}

const setDisableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disable = true;
}

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (checkFormValidity (inputList)) {
    setDisableButton(buttonElement, inactiveButtonClass);
  } else {
    setAbleButton(buttonElement, inactiveButtonClass);
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState (inputList, buttonElement, rest);

  inputList.forEach ((inputElement) => {
    inputElement.addEventListener ('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  })
}

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      });
    setEventListeners (formElement, rest);
  });
}

enableValidation(config);
