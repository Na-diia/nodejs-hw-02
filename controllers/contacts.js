const { HttpError } = require('../helpers');
const {ctrlWrapper} = require('../utils');

const Contact = require('../models/contact');

const getAllContacts = async(req, res) => {
   const result = await Contact.find();
   res.status(200).json(result);
}; 

const getOneContactById = async(req, res) => {
   const {contactId} = req.params;
   const result = await Contact.findById(contactId);
   if(!result) {
      throw HttpError(404, "Not found");
   }
   res.status(200).json(result);
};

const addOneContact = async(req, res) => {
   const result = await Contact.create(req.body);
   res.status(201).json(result);
};

const deleteContact = async(req, res) => {
   const {contactId} = req.params;
   const result = await Contact.findByIdAndDelete(contactId);
   if(!result) {
       throw HttpError(404, "Not found");
   }
   res.status(200).json({
      message: 'contact deleted',
   });
};

const innovateContact = async(req, res) => {
   const {contactId} = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
   if(!result) {
      throw HttpError(404, "Not found");
   }
   res.status(200).json(result);
};

const updateStatusContact = async(req, res) => {
   const {contactId} = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true} );
   if(!result) {
      throw HttpError(404, "Not found");   
   }
   res.status(200).json(result);
};

module.exports = {
   getAllContacts: ctrlWrapper(getAllContacts),
   getOneContactById: ctrlWrapper(getOneContactById),
   addOneContact: ctrlWrapper(addOneContact),
   deleteContact: ctrlWrapper(deleteContact),
   innovateContact: ctrlWrapper(innovateContact),
   updateStatusContact: ctrlWrapper(updateStatusContact),
};