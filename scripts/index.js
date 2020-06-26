const editButton = document.querySelector('.profile__button');
const editPopup = document.querySelector('.edit');
const editClose = editPopup.querySelector('.edit__close');
const editForm = editPopup.querySelector('.edit__form');
const editSubmit = editForm.querySelector('.edit__submit');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const addButton = document.querySelector('.button_add');
const addPopup = document.querySelector('.add');
const addClose = addPopup.querySelector('.add__close');
const addForm = addPopup.querySelector('.add__form');
const addSubmit = addForm.querySelector('.add__submit');
const titleInput = addForm.querySelector('.popup__input_type_title');
const linkInput = addForm.querySelector('.popup__input_type_link');

const picturesTemplateElement = document.querySelector('.pictures-template');
const picturesListElement = document.querySelector('.pictures__list');


// Открытие-закрытие попапов
function popupToggle(popup) {
    return function () {
        popup.classList.toggle('popup_opened')
    } 
}

// Редактирование данных в попапе edit
function editFormSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle(editPopup)();
}

// Добавление данных в попап add
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

editClose.addEventListener('click', popupToggle(editPopup));
editForm.addEventListener('submit', editFormSubmitHandler);

addButton.addEventListener('click', popupToggle(addPopup));
addClose.addEventListener('click', popupToggle(addPopup));
addForm.addEventListener('submit', addFormSubmitHandler);

// Добавление первых 6 элементов на страницу
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

    picturesElement.querySelector('.pictures__delete').addEventListener('click', deletePicturesElement);

    picturesListElement.prepend(picturesElement);
}

function deletePicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__item')
    picturesElement.remove();
}

function likePicturesElement(event) {
    const picturesElement = event.target.closest('.pictures__item')
    picturesElement.remove();
}

initialPicturesElements.forEach(item => {
    addPicturesElement(item.name, item.link);
});