const {authenticate} = require('./authenticate');
const {authValidate, subValidate, emailValidate} = require('./validateUser');
const {addValidation, updateValidation, validateFavoriteField, validateId} = require('./validateData')
const upload = require('./upload');

module.exports = {
    authenticate,
    authValidate,
    subValidate,
    emailValidate,
    addValidation,
    updateValidation,
    validateFavoriteField,
    validateId,
    upload,
};