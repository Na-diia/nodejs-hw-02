const express = require('express');

const {getAllContacts, 
      getOneContactById, 
      addOneContact,
      deleteContact, 
      innovateContact,
      updateStatusContact,
} = require('../../controllers/contacts');

const {updateValidation, addValidation, validateFavoriteField, validateId } = require('../../middlewares/validateData');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', validateId, getOneContactById);

router.post('/', addValidation, addOneContact);

router.delete('/:contactId', validateId, deleteContact);

router.put('/:contactId', validateId ,updateValidation, innovateContact);

router.patch('/:contactId/favorite', validateId , validateFavoriteField, updateStatusContact);

module.exports = router;