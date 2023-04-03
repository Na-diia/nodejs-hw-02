const { HttpError } = require('../helpers');
const contacts = require('../models/contacts');

const getAllContacts = async(req, res, next) => {
   try {
     const result = await contacts.listContacts();
     res.status(200).json(result);
   } catch (error) {
     next(error);
   };
}; 

const getOneContactById = async(req, res, next) => {
   try {
     const {contactId} = req.params;
     const result = await contacts.getContactById(contactId);
     if(!result) {
        throw HttpError(404, "Not found");
     }
     res.status(200).json(result);
   } catch (error) {
      next(error);
   };
};

const addOneContact = async(req, res, next) => {
    try {
     const result = await contacts.addContact(req.body);
     res.status(201).json(result);
    } catch (error) {
        next(error);
    };
};

const deleteContact = async(req, res, next) => {
    try {
     const {contactId} = req.params;
     const result = await contacts.removeContact(contactId);
     if(!result) {
        throw HttpError(404, "Not found");
     }
     res.status(200).json({
        message: 'contact deleted',
     })
    } catch (error) {
        next(error);
    };
};

const innovateContact = async(req, res, next) => {
   try {
     const {contactId} = req.params;
     const result = await contacts.updateContact(contactId, req.body);
     if(!result) {
        throw HttpError(404, "Not found");
     }
     res.status(200).json(result);
   } catch (error) {
      next(error);
   };
};

module.exports = {
    getAllContacts,
    getOneContactById,
    addOneContact,
    deleteContact,
    innovateContact,
};