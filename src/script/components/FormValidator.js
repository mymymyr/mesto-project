export default class FormValidator {
    constructor(object, formElement) {
        this._formSelector = object.formSelector;
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._closeBtnSelector = object.closeBtnSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
        this._form = formElement;
        this._errorElements = {};
    }

    _showInputError(inputElement, errorMessage) {
        this._errorElements[inputElement.id] = this._form.querySelector(`.${inputElement.id}-error`);
        this._errorElements[inputElement.id].textContent = errorMessage;
        this._errorElements[inputElement.id].classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        if (this._errorElements[inputElement.id]) {
            this._errorElements[inputElement.id].classList.remove(this._errorClass);
            this._errorElements[inputElement.id].textContent = '';
        }
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
            inputElement.classList.add(this._inputErrorClass);
        } else {
            this._hideInputError(inputElement);
            inputElement.classList.remove(this._inputErrorClass);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState() {
        this._invalidInput = this._hasInvalidInput();
        if (this._invalidInput) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
        this._buttonElement.disabled = this._invalidInput;
    };

    _setValidationEventListeners() {
        this._toggleButtonState();
        const self = this;
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                self._checkInputValidity(inputElement);
                self._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._setValidationEventListeners();
    };

    clearValidationState() {
        const self = this;
        this._inputList.forEach((inputElement) => {
            inputElement.classList.remove(self._inputErrorClass);
            inputElement.setCustomValidity("");
            self._hideInputError(inputElement);
        });
        this._toggleButtonState();
    };
}
