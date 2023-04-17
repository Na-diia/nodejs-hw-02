const Joi = require('joi');
const {HttpError} = require('../helpers/index');
const {isValidObjectId} = require('mongoose');

const addSchema =  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
}).unknown(false);

const update = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
}).or('name', 'email', 'phone').unknown(false);

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const addValidation = (req, res, next) => {
    const {error} = addSchema.validate(req.body);
    if(error) {
        const path = error.details[0].path;
        throw HttpError(400, `missing required ${path} field`);
    }
    next();
};

const updateValidation = (req, res, next) => {
    const {error} = update.validate(req.body);
    if(!req.body) {
        throw HttpError(400, 'missing field');        
    } else if(error) {
        throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
    }
    next();
};

const validateFavoriteField = (req, res, next) => {
    const {error} = updateFavoriteSchema.validate(req.body);
    if(error) {
        throw HttpError(400, "missing field favorite");
    }
    next();   
};

const validateId = (req, res, next)  => {
    const {contactId} = req.params;

    if(!isValidObjectId(contactId)) {
        throw HttpError(404, "Not found");
    }
    next();
};

module.exports = {
    addValidation,
    updateValidation,
    validateFavoriteField,
    validateId,
};

