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
const imageLinkInput = addForm.querySelector('.popup__input_type_link');

const pictureTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures__list');

// Открытие-закрытие попапов
function popupToggle(popup) {
    return function () {
        popup.classList.toggle('popup_opened')
    } 
}

// Редактирование данных в попапе edit
function formSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle(editPopup)();
}

editButton.addEventListener('click', function() {
    popupToggle(editPopup)();

    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
});

editClose.addEventListener('click', popupToggle(editPopup));
editForm.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', popupToggle(addPopup));
addClose.addEventListener('click', popupToggle(addPopup));

// Добавление первых 6 элементов на страницу
const initialCards = [
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

function elementMaker(item) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.pictures__image').src = item.link;
    pictureElement.querySelector('.pictures__title').textContent = item.name;
    pictures.append(pictureElement);
}

initialCards.forEach(elementMaker);