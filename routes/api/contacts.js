const express = require('express');

const {getAllContacts, 
      getOneContactById, 
      addOneContact,
      deleteContact, 
      innovateContact,
} = require('../../controllers/contacts');

const {updateValidation, addValidation} = require('../../middlewares/validateData');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', getOneContactById);

router.post('/', addValidation, addOneContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateValidation, innovateContact);

module.exports = router;