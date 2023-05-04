const Joi = require('joi');

const {HttpError} = require('../helpers');

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const authValidate = async(req, res, next) => {
   const {error} = authSchema.validate(req.body);
   if(error) {
    const path = error.details[0].path;
    next(HttpError(400, `missing required ${path} field`));
   }
   next();
}; 

const emailValidate = async(req, res, next) => {
    const {error} = emailSchema.validate(req.body);
    if(error) {
        next(HttpError(400, 'missing required field email'));
    }
    next();
};

const subValidate = async(req, res, next) => {
   const {error} = subscriptionSchema.validate(req.body);
   if(error) {
    next(HttpError(400, 'Missing fields'));
   }
   next();
};

module.exports = {
    authValidate,
    subValidate,
    emailValidate,
};