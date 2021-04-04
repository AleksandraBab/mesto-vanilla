/* Объявляем переменные */

const initialCards = [
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
  },
  {
    name: 'Финский залив',
    link: 'images/finzaliv.jpg'
  },
  {
    name: 'Иркутск',
    link: 'images/irkutsk.jpg'
  },
  {
    name: 'Выборг',
    link: 'images/vyborgsity.jpg'
  },
  {
    name: 'Ленинградская область',
    link: 'images/Lenobl.jpg'
  },
  {
    name: 'Мунку-Сардык',
    link: 'images/munku.jpg'
  }
];

const cardContainer = document.querySelector('.elements__grid-items');
const cardTemplate = document.querySelector('.template-card');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const caption = document.querySelector('.profile__caption');

const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const captionInput = formElementEdit.querySelector('.popup__input_type_caption')
const submitEditButton = formElementEdit.querySelector('.popup__submit-btn_type_edit');

const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const submitAddButton = formElementAdd.querySelector('.popup__submit-btn_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const placeSrc = formElementAdd.querySelector('.popup__input_type_src');


const popupImage = document.querySelector('.popup_type_image');
const popupPic = popupImage.querySelector('.popup__image');
const popupName = popupImage.querySelector('.popup__caption');


/* Работаем с попапами */

const clearErrorElements = (formElement) => {
  const errorList = Array.from(formElement.querySelectorAll('.popup__error'));
  errorList.forEach ((error) => {
    error.classList.remove('popup__error_active')
  });

  const errorInputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  errorInputList.forEach ((error) => {
    error.classList.remove('popup__input_type_error')
  });
}

const closeWithClick = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popup)
 }
}

const closeWithEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

const openPopupAdd = () => {
  placeInput.value = '';
  placeSrc.value = '';

  setDisableButton(submitAddButton, 'popup__submit-btn_disabled')
  clearErrorElements(formElementAdd);
  openPopup(popupAdd);
}

const openPopupEdit = () => {
  nameInput.value = nameProfile.textContent;
  captionInput.value = caption.textContent;

  setAbleButton(submitEditButton, 'popup__submit-btn_disabled')
  clearErrorElements(formElementEdit);
  openPopup(popupEdit);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  caption.textContent = captionInput.value;

  closePopup(popupEdit);
}

/* Работаем с карточками */

const likeCard = (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like-btn_liked');
}

const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
}

const openImage = (evt) => {
  const eventTarget = evt.target;
  popupPic.src = eventTarget.src;
  popupPic.alt = eventTarget.alt;
  popupName.textContent = eventTarget.alt;

  openPopup(popupImage);
}

const addTaskListeners = (card) => {
	const likeButton = card.querySelector('.element__like-btn');
	likeButton.addEventListener('click', likeCard);

  const deleteButton = card.querySelector('.element__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const imageButton = card.querySelector('.element__image');
  imageButton.addEventListener('click', openImage);
}

const createCardDomNode = (item) => {
  const newItem = cardTemplate.content.cloneNode(true);

  const cardName = newItem.querySelector('.element__heading');
  cardName.textContent = item.name;
  const cardImage = newItem.querySelector('.element__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  addTaskListeners(newItem);

	return newItem;
}

const renderCards = () => {
	const result = initialCards.map(function(item) {
		const newCard = createCardDomNode(item);

		return newCard;
	});

	cardContainer.append(...result);
}

const cardSubmitHandler = (evt) => {
  evt.preventDefault();

  const cardName = placeInput.value;
  const cardLink = placeSrc.value;

  const newCard = createCardDomNode({name: cardName, link: cardLink});
  addTaskListeners(newCard);

  cardContainer.prepend(newCard)

  closePopup(popupAdd);

  formElementAdd.reset();
}

/* Вызываем события */

formElementEdit.addEventListener('submit', (evt) => {
  const inputList = Array.from(formElementEdit.querySelectorAll(config.inputSelector));
  if (!checkFormValidity (inputList)) {
    formSubmitHandler(evt);
  }
  });

formElementAdd.addEventListener('submit', (evt) => {
  const inputList = Array.from(formElementAdd.querySelectorAll(config.inputSelector));
  if (!checkFormValidity (inputList)) {
    cardSubmitHandler(evt);
  }
  });

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
popupEdit.addEventListener('click', closeWithClick);
popupAdd.addEventListener('click', closeWithClick);
popupImage.addEventListener('click', closeWithClick);

renderCards();

