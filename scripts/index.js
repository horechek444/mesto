const popupList = document.querySelectorAll('.popup');

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

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
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

function createPicturesElement(name, link) {
    const picturesElement = picturesTemplateElement.content.cloneNode(true);

    picturesElement.querySelector('.pictures__title').textContent = name;
    picturesElement.querySelector('.pictures__image').src = link;
    picturesElement.querySelector('.pictures__image').alt = name;
    addPicturesElementListeners(picturesElement);

    return picturesElement;
}

function renderPicturesElement(element) {
    picturesListElement.prepend(element);
}

function addFormSubmitHandler(event) {
    event.preventDefault();

    const name = titleInput.value;
    const link = linkInput.value;

    titleInput.value = '';
    linkInput.value = '';

    const element = createPicturesElement(name, link);
    renderPicturesElement(element);
    togglePopup(addPopup);
}

function closePopupByOverlay(event, popup) {
    if (event.target !== event.currentTarget) { 
        return
    }
    togglePopup(popup);
}

function closePopupByEsc(event) {
    if (event.keyCode === 27) { 
        const popupArray = Array.from(popupList);
        popupArray.forEach((popupElement) => {
            popupElement.classList.remove('popup_opened');
        });
    }
}

editButton.addEventListener('click', () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;

    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));

    togglePopup(editPopup);
});

editPopupClose.addEventListener('click', () => togglePopup(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);
editPopup.addEventListener('click', () => closePopupByOverlay(event, editPopup));
document.addEventListener('keydown', closePopupByEsc);

addButton.addEventListener('click', () => {
    addForm.reset();
    togglePopup(addPopup);
});

addPopupClose.addEventListener('click', () => togglePopup(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);
addPopup.addEventListener('click', () => closePopupByOverlay(event, addPopup));

picturePopupClose.addEventListener('click', () => togglePopup(picturePopup));
picturePopup.addEventListener('click', () => closePopupByOverlay(event, picturePopup));

initialPicturesElements.forEach(item => {
    const element = createPicturesElement(item.name, item.link);
    renderPicturesElement(element);
});
