const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.popup_type_edit');
const editPopupClose = editPopup.querySelector('.popup__close');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.popup_type_add');
const addPopupClose = addPopup.querySelector('.popup__close');
const addForm = addPopup.querySelector('.popup__form');
const titleInput = addForm.querySelector('.popup__input_type_title');
const linkInput = addForm.querySelector('.popup__input_type_link');

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupClose = picturePopup.querySelector('.popup__close');
const picturePopupImage = picturePopup.querySelector('.popup__image');
const picturePopupCaption = picturePopup.querySelector('.popup__caption');

const picturesTemplateElement = document.querySelector('.pictures-template');
const picturesListElement = document.querySelector('.pictures__list');

const initialPicturesElements = [
    {
        name: 'Калининград',
        link: './images/kaliningrad.jpg'
    },
    {
        name: 'Саха',
        link: './images/sakha.jpg'
    },
    {
        name: 'Владивосток',
        link: './images/vladivostok.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/kamchatka.jpg'
    },
    {
        name: 'Сибирь',
        link: './images/siberia.jpg'
    },
    {
        name: 'Клин',
        link: './images/klin.jpg'
    }
];

const validationParams = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__submit',    
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
    controlSelectorClass: '.popup__control',
    errorClass: '.popup__error'
};

function closePopupByEsc(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.key === 'Escape') { 
        currentPopup.classList.remove('popup_opened');
    }
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByEsc);
    } else {
        document.removeEventListener('keydown', closePopupByEsc);
    }
}

function editFormSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    togglePopup(editPopup);
}

function deletePicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__item');
    picturesElement.remove();
}

function likePicturesElement(event) {
    event.target.classList.toggle('pictures__like_active');
}

function showPopupPicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__image');

    picturePopupImage.src = picturesElement.src;
    picturePopupCaption.textContent = picturesElement.alt;
    togglePopup(picturePopup);
}

function addPicturesElementListeners(picturesElement) {
    picturesElement.querySelector('.pictures__delete').addEventListener('click', deletePicturesElement);
    picturesElement.querySelector('.pictures__like').addEventListener('click', likePicturesElement);
    picturesElement.querySelector('.pictures__image').addEventListener('click', showPopupPicturesElement);
}

// function createPicturesElement(name, link) {
//     const picturesElement = picturesTemplateElement.content.cloneNode(true);

//     picturesElement.querySelector('.pictures__title').textContent = name;
//     picturesElement.querySelector('.pictures__image').src = link;
//     picturesElement.querySelector('.pictures__image').alt = name;
//     addPicturesElementListeners(picturesElement);

//     return picturesElement;
// }

function createPicturesElement(newElement) {
    const picturesElement = picturesTemplateElement.content.cloneNode(true);

    picturesElement.querySelector('.pictures__title').textContent = newElement.name;
    picturesElement.querySelector('.pictures__image').src = newElement.link;
    picturesElement.querySelector('.pictures__image').alt = newElement.name;
    addPicturesElementListeners(picturesElement);

    return picturesElement;
}

function renderPicturesElement(element) {
    picturesListElement.prepend(element);
}

// function addFormSubmitHandler(event) {
//     event.preventDefault();

//     const name = titleInput.value;
//     const link = linkInput.value;

//     titleInput.value = '';
//     linkInput.value = '';

//     const element = createPicturesElement(name, link);
//     renderPicturesElement(element);
//     togglePopup(addPopup);
// }

function addFormSubmitHandler(event) {
    event.preventDefault();

    const newElement = {
        name: titleInput.value,
        link: linkInput.value
    };

    const element = createPicturesElement(newElement);
    renderPicturesElement(element);
    togglePopup(addPopup);
}

function closePopupByOverlay(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.target === event.currentTarget) { 
        togglePopup(currentPopup);
    }
}

function popupErrorUpdate(form) {
    const inputsArray = Array.from(form.querySelectorAll('.popup__input'));
    inputsArray.forEach((inputElement) => {
        hideInputError(inputElement, validationParams);
    });
}

editButton.addEventListener('click', () => {
    popupErrorUpdate(editForm);

    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    togglePopup(editPopup);
});

editPopupClose.addEventListener('click', () => togglePopup(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);
editPopup.addEventListener('mousedown', closePopupByOverlay);

addButton.addEventListener('click', () => {
    addForm.reset();
    popupErrorUpdate(addForm);
    togglePopup(addPopup);
});

addPopupClose.addEventListener('click', () => togglePopup(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);
addPopup.addEventListener('mousedown', closePopupByOverlay);

picturePopupClose.addEventListener('click', () => togglePopup(picturePopup));
picturePopup.addEventListener('mousedown', closePopupByOverlay);

// initialPicturesElements.forEach(item => {
//     const element = createPicturesElement(item.name, item.link);
//     renderPicturesElement(element);
// });

initialPicturesElements.forEach(item => {
    const element = createPicturesElement(item);
    renderPicturesElement(element);
});

enableValidation(validationParams);
