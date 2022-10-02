// const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(errorClass);
// };

// const hideInputError = (formElement, inputElement, errorClass) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     errorElement.classList.remove(errorClass);
//     errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
//     if (inputElement.validity.patternMismatch) {
//         inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//         inputElement.setCustomValidity("");
//     }
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, errorClass);
//         inputElement.classList.add(inputErrorClass);
//     } else {
//         hideInputError(formElement, inputElement, errorClass, inputErrorClass);
//         inputElement.classList.remove(inputErrorClass);
//     }
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     })
// };

// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//     const invalidInput = hasInvalidInput(inputList);
//     if (invalidInput) {
//         buttonElement.classList.add(inactiveButtonClass);
//     } else {
//         buttonElement.classList.remove(inactiveButtonClass);
//     }
//     buttonElement.disabled = invalidInput;
// };

// const setValidationEventListeners = (inputList, buttonElement, formElement, inactiveButtonClass, inputErrorClass, errorClass) => {
//     toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
//             toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//         });
//     });
// };

// const enableValidation = (object) => {
//     const formList = Array.from(document.querySelectorAll(object.formSelector));
//     formList.forEach((formElement) => {
//         const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
//         const buttonElement = formElement.querySelector(object.submitButtonSelector);
//         setValidationEventListeners(inputList, buttonElement, formElement, object.inactiveButtonClass, object.inputErrorClass, object.errorClass);
//     });
// };

// const clearValidationState = (popup, object) => {
//     const inputList = Array.from(popup.querySelectorAll(object.inputSelector));
//     const buttonElement = popup.querySelector(object.submitButtonSelector);
//     inputList.forEach((inputElement) => {
//         inputElement.classList.remove(object.inputErrorClass);
//         inputElement.setCustomValidity("");
//         hideInputError(popup, inputElement, object.errorClass);
//     });
//     toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
// };

// export { enableValidation, clearValidationState };