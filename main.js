!function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(module,exports,__webpack_require__){eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/pages/index.css?")},function(module,__webpack_exports__,__webpack_require__){"use strict";eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: ./src/pages/index.css\nvar pages = __webpack_require__(0);\n\n// CONCATENATED MODULE: ./src/components/Card.js\nclass Card {\n  constructor(data, handleCardClick, {\n    handleLikeClick,\n    handleCardDelete\n  }, currentId, cardSelector) {\n    this._name = data.name;\n    this._link = data.link;\n    this._handleCardClick = handleCardClick;\n    this._handleLikeClick = handleLikeClick;\n    this._cardSelector = cardSelector;\n    this._currentId = currentId;\n    this._ownerId = data.owner._id;\n    this._id = data._id;\n    this._likes = data.likes;\n    this._handleCardDelete = handleCardDelete;\n  }\n\n  _getTemplate() {\n    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.pictures__item').cloneNode(true);\n    return cardElement;\n  }\n\n  _getView() {\n    if (this._ownerId === this._currentId) {\n      this._element.querySelector('.pictures__delete').classList.add('pictures__delete_show');\n    }\n  }\n\n  generateCard() {\n    this._element = this._getTemplate();\n\n    const picturesImage = this._element.querySelector('.pictures__image');\n\n    this._setEventListeners();\n\n    this._element.querySelector('.pictures__title').textContent = this._name;\n    picturesImage.src = this._link;\n    picturesImage.alt = this._name;\n    this._element.querySelector('.pictures__like-counter').textContent = this._likes.length;\n\n    this._getView();\n\n    return this._element;\n  }\n\n  isLiked() {\n    return this._isLiked;\n  }\n\n  setLike(data) {\n    this._isLiked = data.likes.filter(item => {\n      return item._id == this._currentId;\n    }).length > 0; // проверяем что лайк есть и он мой\n\n    this._element.querySelector('.pictures__like-counter').textContent = data.likes.length;\n\n    if (this._isLiked) {\n      this._element.querySelector('.pictures__like').classList.add('pictures__like_active');\n    } else {\n      this._element.querySelector('.pictures__like').classList.remove('pictures__like_active');\n    }\n  }\n\n  deleteCard() {\n    this._element.remove();\n\n    this._element = null;\n  }\n\n  _setEventListeners() {\n    this._element.querySelector('.pictures__delete').addEventListener('click', () => this._handleCardDelete());\n\n    this._element.querySelector('.pictures__like').addEventListener('click', () => this._handleLikeClick());\n\n    this._element.querySelector('.pictures__image').addEventListener('click', () => this._handleCardClick());\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/Section.js\nclass Section {\n  constructor({\n    items,\n    renderer\n  }, containerSelector) {\n    this._initialArray = items;\n    this._renderer = renderer;\n    this._container = document.querySelector(containerSelector);\n  }\n\n  renderItems() {\n    this._initialArray.forEach(item => this._renderer(item));\n  }\n\n  addItem(element) {\n    this._container.append(element);\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/Popup.js\nclass Popup {\n  constructor(popupSelector) {\n    this._popup = document.querySelector(popupSelector);\n  }\n\n  open() {\n    this._popup.classList.add('popup_opened');\n\n    document.addEventListener('keydown', event => this._handleEscClose(event));\n  }\n\n  close() {\n    this._popup.classList.remove('popup_opened');\n\n    document.removeEventListener('keydown', event => this._handleEscClose(event));\n  }\n\n  _handleEscClose(event) {\n    if (event.key === 'Escape') {\n      this.close();\n    }\n  }\n\n  _handleOverlayClose(event) {\n    if (event.target === event.currentTarget) {\n      this.close();\n    }\n  }\n\n  setEventListeners() {\n    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());\n\n    this._popup.addEventListener('mousedown', event => this._handleOverlayClose(event));\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/PopupWithImage.js\n\nclass PopupWithImage_PopupWithImage extends Popup {\n  constructor(popupSelector) {\n    super(popupSelector);\n    this._popupImage = this._popup.querySelector('.popup__image');\n    this._popupCaption = this._popup.querySelector('.popup__caption');\n  }\n\n  open() {\n    super.open();\n    const picturesElement = event.target.closest('.pictures__image');\n    this._popupImage.src = picturesElement.src;\n    this._popupImage.alt = picturesElement.alt;\n    this._popupCaption.textContent = picturesElement.alt;\n  }\n\n  close() {\n    super.close();\n    this._popupImage.src = '';\n    this._popupImage.alt = '';\n    this._popupCaption.textContent = '';\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/PopupWithForm.js\n\nclass PopupWithForm_PopupWIthForm extends Popup {\n  constructor({\n    popupSelector,\n    handleFormSubmit\n  }) {\n    super(popupSelector);\n    this._handleFormSubmit = handleFormSubmit;\n    this._form = this._popup.querySelector('.popup__form');\n  }\n\n  _getInputValues() {\n    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));\n    this._formValues = {};\n\n    this._inputList.forEach(input => this._formValues[input.name] = input.value);\n\n    return this._formValues;\n  }\n\n  close() {\n    super.close();\n\n    this._form.reset();\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._form.addEventListener('submit', event => {\n      event.preventDefault();\n\n      this._handleFormSubmit(this._getInputValues());\n    });\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/FormValidator.js\nclass FormValidator {\n  constructor(validationParams, targetFormElement) {\n    this._formElement = validationParams.formElement;\n    this._inputElement = validationParams.inputElement;\n    this._buttonElement = validationParams.buttonElement;\n    this._inactiveButtonClass = validationParams.inactiveButtonClass;\n    this._inputErrorClass = validationParams.inputErrorClass;\n    this._errorShowClass = validationParams.errorShowClass;\n    this._controlSelectorClass = validationParams.controlSelectorClass;\n    this._errorClass = validationParams.errorClass;\n    this._targetFormElement = targetFormElement;\n  }\n\n  _showInputError(inputElement, errorMessage) {\n    const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);\n    inputElement.classList.add(this._inputErrorClass);\n    errorElement.textContent = errorMessage;\n    errorElement.classList.add(this._errorShowClass);\n  }\n\n  _hideInputError(inputElement) {\n    const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);\n    inputElement.classList.remove(this._inputErrorClass);\n    errorElement.classList.remove(this._errorShowClass);\n    errorElement.textContent = '';\n  }\n\n  _checkInputValidity(inputElement) {\n    if (!inputElement.validity.valid) {\n      this._showInputError(inputElement, inputElement.validationMessage);\n    } else {\n      this._hideInputError(inputElement);\n    }\n  }\n\n  _hasInvalidInput(inputList) {\n    return inputList.some(inputElement => {\n      return !inputElement.validity.valid;\n    });\n  }\n\n  _toggleButtonState(inputList, buttonElement) {\n    if (this._hasInvalidInput(inputList)) {\n      buttonElement.classList.add(this._inactiveButtonClass);\n      buttonElement.setAttribute('disabled', true);\n    } else {\n      buttonElement.classList.remove(this._inactiveButtonClass);\n      buttonElement.removeAttribute('disabled');\n    }\n  }\n\n  _setEventListeners(formElement) {\n    const inputList = Array.from(formElement.querySelectorAll(this._inputElement));\n    const buttonElement = formElement.querySelector(this._buttonElement);\n    inputList.forEach(inputElement => {\n      inputElement.addEventListener('input', () => {\n        this._checkInputValidity(inputElement);\n\n        this._toggleButtonState(inputList, buttonElement);\n      });\n    });\n  }\n\n  updateErrorsAndButtonState(formElement) {\n    const inputList = Array.from(formElement.querySelectorAll(this._inputElement));\n    const buttonElement = formElement.querySelector(this._buttonElement);\n    inputList.forEach(inputElement => {\n      this._hideInputError(inputElement);\n    });\n\n    this._toggleButtonState(inputList, buttonElement);\n  }\n\n  enableValidation() {\n    this.updateErrorsAndButtonState(this._targetFormElement);\n\n    this._setEventListeners(this._targetFormElement);\n\n    this._targetFormElement.addEventListener('submit', event => {\n      event.preventDefault();\n    });\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/UserInfo.js\nclass UserInfo {\n  constructor({\n    userNameElement,\n    userInfoElement\n  }) {\n    this._userNameElement = userNameElement;\n    this._userInfoElement = userInfoElement;\n  }\n\n  getUserInfo() {\n    return {\n      name: this._userNameElement.textContent,\n      about: this._userInfoElement.textContent\n    };\n  }\n\n  setUserInfo(data) {\n    this._userNameElement.textContent = data.name;\n    this._userInfoElement.textContent = data.about;\n  }\n\n}\n// CONCATENATED MODULE: ./src/utils/variables.js\nconst editButton = document.querySelector('.profile__button');\nconst editPopup = document.querySelector('.popup_type_edit');\nconst editForm = editPopup.querySelector('.popup__form');\nconst nameInput = editForm.querySelector('.popup__input_type_name');\nconst jobInput = editForm.querySelector('.popup__input_type_about');\nconst addButton = document.querySelector('.button_add');\nconst addPopup = document.querySelector('.popup_type_add');\nconst addForm = addPopup.querySelector('.popup__form');\nconst picturesTemplateSelector = '.pictures-template';\nconst userName = document.querySelector('.profile__title');\nconst userAbout = document.querySelector('.profile__subtitle');\nconst avatarImg = document.querySelector('.avatar');\nconst avatarPopup = document.querySelector('.popup_type_avatar');\nconst avatarForm = avatarPopup.querySelector('.popup__form');\nconst allSavedSubmits = document.querySelectorAll('.popup__submit_type_save');\nconst token = '015c5709-d89c-4f94-866c-ab8c6888fc92';\nconst url = 'https://mesto.nomoreparties.co/v1/cohort-14/';\nconst validationParams = {\n  formElement: '.popup__form',\n  inputElement: '.popup__input',\n  buttonElement: '.popup__submit',\n  inactiveButtonClass: 'popup__submit_type_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorShowClass: 'popup__error_type_active',\n  controlSelectorClass: '.popup__control',\n  errorClass: '.popup__error'\n};\n// CONCATENATED MODULE: ./src/components/PopupWithSubmit.js\n\nclass PopupWithSubmit_PopupWithSubmit extends Popup {\n  constructor(popupSelector) {\n    super(popupSelector);\n    this._form = this._popup.querySelector('.popup__form');\n  }\n\n  setFormSubmitHandler(handler) {\n    this.setFormSubmitHandler = handler;\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._form.addEventListener('submit', event => {\n      event.preventDefault();\n      this.setFormSubmitHandler();\n    });\n  }\n\n}\n// CONCATENATED MODULE: ./src/components/Api.js\nclass Api {\n  constructor({\n    baseUrl,\n    headers\n  }) {\n    this.baseUrl = baseUrl;\n    this.headers = headers;\n  }\n\n  getUserInfo() {\n    return fetch(`${this.baseUrl}users/me`, {\n      headers: this.headers\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  getCards() {\n    return fetch(`${this.baseUrl}cards`, {\n      headers: this.headers\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  setUserInfo(item) {\n    return fetch(`${this.baseUrl}users/me`, {\n      method: 'PATCH',\n      headers: this.headers,\n      body: JSON.stringify({\n        name: item.name,\n        about: item.about\n      })\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  createCard(newCard) {\n    return fetch(`${this.baseUrl}cards`, {\n      method: 'POST',\n      headers: this.headers,\n      body: JSON.stringify({\n        name: newCard.name,\n        link: newCard.link\n      })\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  deleteCard(id) {\n    return fetch(`${this.baseUrl}cards/${id}`, {\n      method: 'DELETE',\n      headers: this.headers\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  likeCard(id) {\n    return fetch(`${this.baseUrl}cards/likes/${id}`, {\n      method: 'PUT',\n      headers: this.headers\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  dislikeCard(id) {\n    return fetch(`${this.baseUrl}cards/likes/${id}`, {\n      method: 'DELETE',\n      headers: this.headers\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  setAvatar(avatar) {\n    return fetch(`${this.baseUrl}users/me/avatar`, {\n      method: 'PATCH',\n      headers: this.headers,\n      body: JSON.stringify(avatar)\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n}\n// CONCATENATED MODULE: ./src/pages/index.js\n\n\n\n\n\n\n\n\n\n\n\nfunction handleCardClick() {\n  popupTypePicture.open();\n}\n\nfunction handleLikeClick(card, data) {\n  const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);\n  promise.then(data => {\n    card.setLike(data);\n  }).catch(err => {\n    console.log(`${err}`);\n  });\n}\n\nconst popupTypeDelete = new PopupWithSubmit_PopupWithSubmit('.popup_type_prevent');\npopupTypeDelete.setEventListeners();\n\nfunction handleCardDelete(card) {\n  popupTypeDelete.setFormSubmitHandler(() => {\n    api.deleteCard(card._id).then(() => {\n      card.deleteCard();\n      popupTypeDelete.close();\n    }).catch(err => {\n      console.log(`${err}`);\n    });\n  });\n  popupTypeDelete.open();\n}\n\nfunction renderLoading(isLoading) {\n  if (isLoading) {\n    Array.from(allSavedSubmits).forEach(submit => {\n      submit.value = \"Сохранение...\";\n    });\n  } else {\n    Array.from(allSavedSubmits).forEach(submit => {\n      submit.value = \"Сохранить\";\n    });\n  }\n}\n\nfunction newCardMaker(data, currentUserId, cardsList) {\n  const newCard = new Card(data, handleCardClick, {\n    handleLikeClick: () => handleLikeClick(newCard, data),\n    handleCardDelete: () => handleCardDelete(newCard)\n  }, currentUserId, picturesTemplateSelector);\n  const cardElement = newCard.generateCard();\n  newCard.setLike(data);\n  cardsList.addItem(cardElement);\n}\n\nconst validAdd = new FormValidator(validationParams, addForm);\nvalidAdd.enableValidation();\nconst validEdit = new FormValidator(validationParams, editForm);\nvalidEdit.enableValidation();\nconst validAvatar = new FormValidator(validationParams, avatarForm);\nvalidAvatar.enableValidation();\nconst popupTypePicture = new PopupWithImage_PopupWithImage('.popup_type_picture');\npopupTypePicture.setEventListeners();\nconst api = new Api({\n  baseUrl: url,\n  headers: {\n    authorization: token,\n    'Content-Type': 'application/json'\n  }\n});\napi.getUserInfo().then(result => {\n  const user = new UserInfo({\n    userNameElement: userName,\n    userInfoElement: userAbout\n  });\n  user.setUserInfo(result);\n  avatarImg.style.backgroundImage = `url(${result.avatar})`;\n  const currentUserId = result._id;\n  const popupTypeEdit = new PopupWithForm_PopupWIthForm({\n    popupSelector: '.popup_type_edit',\n    handleFormSubmit: item => {\n      renderLoading(true);\n      api.setUserInfo(item).then(data => {\n        user.setUserInfo(data);\n        popupTypeEdit.close();\n      }).catch(err => {\n        console.log(`${err}`);\n      }).finally(() => {\n        renderLoading(false);\n      });\n    }\n  });\n  popupTypeEdit.setEventListeners();\n  editButton.addEventListener('click', () => {\n    validEdit.updateErrorsAndButtonState(editForm);\n    const userData = user.getUserInfo();\n    nameInput.value = userData.name;\n    jobInput.value = userData.about;\n    nameInput.dispatchEvent(new Event('input'));\n    jobInput.dispatchEvent(new Event('input'));\n    popupTypeEdit.open();\n  });\n  api.getCards().then(cards => {\n    const cardsList = new Section({\n      items: cards,\n      renderer: item => {\n        newCardMaker(item, currentUserId, cardsList);\n      }\n    }, '.pictures__list');\n    cardsList.renderItems();\n    const popupTypeAdd = new PopupWithForm_PopupWIthForm({\n      popupSelector: '.popup_type_add',\n      handleFormSubmit: item => {\n        renderLoading(true);\n        api.createCard(item).then(data => {\n          newCardMaker(data, currentUserId, cardsList);\n          popupTypeAdd.close();\n        }).catch(err => {\n          console.log(`${err}`);\n        }).finally(() => {\n          renderLoading(false);\n        });\n      }\n    });\n    popupTypeAdd.setEventListeners();\n    addButton.addEventListener('click', () => {\n      validAdd.updateErrorsAndButtonState(addForm);\n      popupTypeAdd.open();\n    });\n    const popupTypeAvatar = new PopupWithForm_PopupWIthForm({\n      popupSelector: '.popup_type_avatar',\n      handleFormSubmit: item => {\n        renderLoading(true);\n        api.setAvatar(item).then(data => {\n          avatarImg.style.backgroundImage = `url(${data.avatar})`;\n          popupTypeAvatar.close();\n        }).catch(err => {\n          console.log(`${err}`);\n        }).finally(() => {\n          renderLoading(false);\n        });\n      }\n    });\n    popupTypeAvatar.setEventListeners();\n    avatarImg.addEventListener('click', () => {\n      validAvatar.updateErrorsAndButtonState(avatarForm);\n      popupTypeAvatar.open();\n    });\n  }).catch(err => {\n    console.log(`${err}`);\n  });\n}).catch(err => {\n  console.log(`${err}`);\n});\n\n//# sourceURL=webpack:///./src/pages/index.js_+_10_modules?")}]);