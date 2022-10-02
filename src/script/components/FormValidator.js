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
    }

    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError() {
        if (this._errorElement) {
            this._errorElement.classList.remove(this._errorClass);
            this._errorElement.textContent = '';
        }
    };

    checkInputValidity() {
        const self = this;
        this._inputList.forEach((inputElement) => {
            self._checkInputValidity(inputElement);
            self.toggleButtonState();
        });
    }

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
            this._hideInputError();
            inputElement.classList.remove(this._inputErrorClass);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    toggleButtonState() {
        this._invalidInput = this._hasInvalidInput();
        if (this._invalidInput) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
        this._buttonElement.disabled = this._invalidInput;
    };

    _setValidationEventListeners() {
        this.toggleButtonState();
        const self = this;
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                self._checkInputValidity(inputElement);
                self.toggleButtonState();
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
            self._hideInputError();
        });
        this.toggleButtonState();
    };
}
