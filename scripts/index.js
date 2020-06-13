const editButton = document.querySelector('.profile__button');
const popupWindow = document.querySelector('.popup');
const popupClose = popupWindow.querySelector('.popup__close');
const formElement = popupWindow.querySelector('.popup__form');
const popupSubmit = formElement.querySelector('.popup__submit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_about');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

// В целом JS код работает не совсем так, как должен по заданию.
// По идее здесь должно быть три функции - первая открывает попап 
//и копирует данные со странички в инпуты попапа, вторая закрывает попап, 
//а третья копирует данные из инпутов попапа в страничку. А чтобы закрыть 
// попап можно в конце третьей функции вызвать вторую. 
// Как "можно лучше" с помощью if первую и вторую функцию можно объединить в одну.

function popupToggle() {
    
    if (popupWindow.classList.contains('popup_opened')) {
        popupWindow.classList.remove('popup_opened');
    } else {
        popupWindow.classList.add('popup_opened');

        nameInput.value = nameElement.textContent;
        jobInput.value = jobElement.textContent;
    }
}

function formSubmitHandler(event) {
    event.preventDefault(); 
    
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    popupToggle();
}

editButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);