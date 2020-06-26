const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.edit');
const editPopupClose = editPopup.querySelector('.edit__close');
const editForm = editPopup.querySelector('.edit__form');
const editSubmit = editForm.querySelector('.edit__submit');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.add');
const addPopupClose = addPopup.querySelector('.add__close');
const addForm = addPopup.querySelector('.add__form');
const addSubmit = addForm.querySelector('.add__submit');
const titleInput = addForm.querySelector('.popup__input_type_title');
const linkInput = addForm.querySelector('.popup__input_type_link');

const picturePopup = document.querySelector('.picture');
const picturePopupClose = picturePopup.querySelector('.picture__close');
const picturePopupImage = picturePopup.querySelector('.popup__image');
const picturePopupCaption = picturePopup.querySelector('.popup__caption');

const picturesTemplateElement = document.querySelector('.pictures-template');
const picturesListElement = document.querySelector('.pictures__list');

function popupToggle(popup) {
    return function () {
        popup.classList.toggle('popup_opened');
    } 
}

function editFormSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle(editPopup)();
}

function addFormSubmitHandler(event) {
    event.preventDefault();

    const name = titleInput.value;
    const link = linkInput.value;

    titleInput.value = '';
    linkInput.value = '';

    addPicturesElement(name, link);
    popupToggle(addPopup)();
}

editButton.addEventListener('click', function() {
    popupToggle(editPopup)();

    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
});

editPopupClose.addEventListener('click', popupToggle(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);

addButton.addEventListener('click', popupToggle(addPopup));
addPopupClose.addEventListener('click', popupToggle(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);

picturePopupClose.addEventListener('click', popupToggle(picturePopup));

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

function addPicturesElement(name, link) {
    const picturesElement = picturesTemplateElement.content.cloneNode(true);

    picturesElement.querySelector('.pictures__title').textContent = name;
    picturesElement.querySelector('.pictures__image').src = link;
    addPicturesElementListeners(picturesElement);

    picturesListElement.prepend(picturesElement);
}

function addPicturesElementListeners(picturesElement) {
    picturesElement.querySelector('.pictures__delete').addEventListener('click', deletePicturesElement);
    picturesElement.querySelector('.pictures__like').addEventListener('click', likePicturesElement);
    picturesElement.querySelector('.pictures__image').addEventListener('click', showPopupPicturesElement);
}

function deletePicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__item');
    picturesElement.remove();
}

function likePicturesElement(event) {
    event.target.classList.toggle('pictures__like_active');
}

initialPicturesElements.forEach(item => {
    addPicturesElement(item.name, item.link);
});

function showPopupPicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__item');

    picturePopupCaption.textContent = picturesElement.querySelector('.pictures__title').textContent;
    picturePopupImage.src = picturesElement.querySelector('.pictures__image').src;
    picturePopup.classList.add('popup_opened');
}