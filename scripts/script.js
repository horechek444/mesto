// Отсутствуют ошибки в консоли.
// При нажатии на кнопку “Edit” появляется всплывающее окно. Информация из профиля пользователя загружается в соответствующие поля.
// При открытом попапе нажатие на клавишу “Enter” или кнопку «Сохранить» изменяет на странице информацию о пользователе.
// При нажатии на крестик попап закрывается.
// DOM-элементы, к которым есть обращение в скрипте, вынесены в константы.
// Переменные объявлены через let.
// Отсутствуют неиспользуемые участки кода.

const editButton = document.querySelector('profile__button');
const popup = document.querySelector('popup');
const popupClose = popup.querySelector('popup__close');
const formElement = popup.querySelector('popup__form');
const popupSubmit = formElement.querySelector('popup__submit');
const nameInput = formElement.querySelector('popup__input_type_name');
const jobInput = formElement.querySelector('popup__input_type_about');
const nameElement = document.querySelector('profile__title');
const jobElement = document.querySelector('profile__subtitle');

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    // Получите значение полей из свойства value
    let nameValue = nameInput.getAttribute('value');
    let jobValue = jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameValue.textContent = nameElement;
    jobValue.textContent = jobElement;
}

popupSubmit.addEventListener('submit', formSubmitHandler);

function formCloser() {
    
    editButton.addEventListener('click',function (evt) {
        evt.preventDefault();
        popup.classList.add(popup__opened);
    });
    
    popupClose.addEventListener('click',function (evt) {
        evt.preventDefault();
        popup.classList.remove(popup__opened);
    });
}