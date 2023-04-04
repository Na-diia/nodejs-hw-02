const Joi = require('joi');
const {HttpError} = require('../helpers/index');

const addSchema =  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
}).unknown(false);

const update = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
}).or('name', 'email', 'phone').unknown(false);

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
     if(error) {
        throw HttpError(400, 'missing field');
    }
    next();
};

module.exports = {
    addValidation,
    updateValidation,
};

