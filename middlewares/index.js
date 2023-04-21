const {authenticate} = require('./authenticate');
const {authValidate, subValidate} = require('./validateUser');
const {addValidation, updateValidation, validateFavoriteField, validateId} = require('./validateData')

module.exports = {
    authenticate,
    authValidate,
    subValidate,
    addValidation,
    updateValidation,
    validateFavoriteField,
    validateId,
};